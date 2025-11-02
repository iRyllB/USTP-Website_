import React, { useEffect, useState, useMemo } from 'react';
import NavigationBar from "../components/navBar";
import Footer from "../components/footer";
import HeroSection from "../components/HeroSection";
import './news.css';
import './main.css';
import Sample from '../assets/sample.png';
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function News() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const postsPerPage = 10;

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
        fetchBlogPosts();
    }, []);

    const fetchBlogPosts = async (pageNumber = 0) => {
        try {
            setLoading(true);
            setError(null);
            
            const offset = pageNumber * postsPerPage;
            
            const response = await fetch(
                `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/blog_posts?select=*&limit=${postsPerPage}&offset=${offset}&order=created_at.desc`,
                {
                    headers: {
                        "apikey": `${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Error fetching blog posts: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.length < postsPerPage) {
                setHasMore(false);
            }

            // If this is the first page, replace the posts array
            // If it's a subsequent page, append to the existing array
            if (pageNumber === 0) {
                setBlogPosts(data);
            } else {
                setBlogPosts((prev) => [...prev, ...data]);
            }
        } catch (err) {
            console.error("Error fetching blog posts:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to create placeholder image if none exists
    const getImageUrl = (url) => {
        if (!url) return Sample;
        if (url.startsWith('http')) return url;
        return `https://yrvykwljzajfkraytbgr.supabase.co/storage/v1/object/public/blog-images/${url}`;
    };

    // Function to format date nicely
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 1) {
            const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
            if (diffHours < 1) {
                const diffMinutes = Math.floor(diffTime / (1000 * 60));
                return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
            }
            return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else {
            const options = { year: "numeric", month: "long", day: "numeric" };
            return date.toLocaleDateString(undefined, options);
        }
    };

    // Function to strip HTML tags from description for preview
    const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    const truncateText = (text, maxLength = 200) => {
        if (!text) return "";
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchBlogPosts(nextPage);
    };

    // Filter and sort posts based on search term and sort option
    const filteredAndSortedPosts = useMemo(() => {
        let filtered = blogPosts.filter(post =>
            post.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (post.tagline && post.tagline.toLowerCase().includes(searchTerm.toLowerCase())) ||
            stripHtml(post.description).toLowerCase().includes(searchTerm.toLowerCase())
        );

        switch (sortBy) {
            case 'oldest':
                return filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            case 'alphabetical':
                return filtered.sort((a, b) => a.heading.localeCompare(b.heading));
            default: // newest
                return filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
    }, [blogPosts, searchTerm, sortBy]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    return (
        <>
            <title>News</title>
            <NavigationBar />
            <main>
                <HeroSection title="News" theme="news" />

                <section className="news-container">
                    <div className="whats-new-section">
                        <h2>What's New</h2>

                        {/* Search and Filter Controls */}
                        <div className="news-controls">
                            <div className="news-search-container">
                                <div className="news-search-input-wrapper">
                                    <svg className="news-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="news-search-input"
                                    />
                                    {searchTerm && (
                                        <button onClick={clearSearch} className="news-clear-search" aria-label="Clear search">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="news-sort-container">
                                <select value={sortBy} onChange={handleSortChange} className="news-sort-select">
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="alphabetical">A-Z</option>
                                </select>
                            </div>
                        </div>

                        {/* Results Summary */}
                        {searchTerm && (
                            <div className="news-search-results-summary">
                                <p>
                                    {filteredAndSortedPosts.length} result{filteredAndSortedPosts.length !== 1 ? 's' : ''}
                                    {searchTerm && ` for "${searchTerm}"`}
                                </p>
                            </div>
                        )}

                        <div className="blog-posts">
                            {filteredAndSortedPosts.length > 0 ? (
                                filteredAndSortedPosts.map((post, index) => (
                                    <div key={post.id} className="blog-post" data-aos="fade-up" data-aos-delay={index * 100}>
                                        <div className="post-image">
                                            <img 
                                                src={getImageUrl(post.image_url)} 
                                                alt={post.heading} 
                                            />
                                        </div>
                                        <div className="post-content">
                                            <div className="post-header">
                                                <h3>{post.heading}</h3>
                                                <p className="post-date">{formatDate(post.created_at)}</p>
                                            </div>
                                            <p className="post-description">
                                                {post.tagline || truncateText(stripHtml(post.description), 300)}
                                            </p>
                                            <Link to={`/news/article/${post.id}`} className="read-button">
                                                Read
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : !loading && !error ? (
                                <div className="no-posts">
                                    <p>
                                        {searchTerm
                                            ? `No articles found matching "${searchTerm}". Try adjusting your search terms.`
                                            : "No blog posts found. Check back soon for updates!"
                                        }
                                    </p>
                                    {searchTerm && (
                                        <button onClick={clearSearch} className="news-clear-search-button">
                                            Clear Search
                                        </button>
                                    )}
                                </div>
                            ) : null}
                            
                            {loading && (
                                <div className="loading-container">
                                    <div className="loading-spinner"></div>
                                    <p>Loading posts...</p>
                                </div>
                            )}
                            
                            {error && (
                                <div className="error-container">
                                    <div className="error-icon">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10"/>
                                            <line x1="15" y1="9" x2="9" y2="15"/>
                                            <line x1="9" y1="9" x2="15" y2="15"/>
                                        </svg>
                                    </div>
                                    <h3>Oops! Something went wrong</h3>
                                    <p>We couldn't load the articles. Please check your connection and try again.</p>
                                    <button onClick={fetchBlogPosts} className="retry-button">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 4v6h6M23 20v-6h-6"/>
                                            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                                        </svg>
                                        Try Again
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        {hasMore && blogPosts.length > 0 && !loading && !searchTerm && (
                            <div className="load-more-container">
                                <button
                                    onClick={loadMore}
                                    className="load-more-button"
                                    disabled={loading}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 5v14M5 12l7 7 7-7"/>
                                    </svg>
                                    Load More Articles
                                </button>
                                <p className="posts-count">
                                    Showing {blogPosts.length} articles
                                </p>
                            </div>
                        )}

                        {/* Pagination info when searching */}
                        {searchTerm && filteredAndSortedPosts.length > 0 && (
                            <div className="pagination-info">
                                <p>
                                    Showing {filteredAndSortedPosts.length} of {blogPosts.length} articles
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
