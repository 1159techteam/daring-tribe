"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, User, BookOpen, Megaphone, Users, GraduationCap, ArrowRight, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { BLOG_DATA, CATEGORIES } from "@/lib/blog-data"

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    salesbook: <BookOpen className="w-4 h-4" />,
    community: <Users className="w-4 h-4" />,
    insights: <GraduationCap className="w-4 h-4" />,
    daring: <Megaphone className="w-4 h-4" />,
}

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState<string>("all")

    const filteredPosts = activeCategory === "all"
        ? BLOG_DATA
        : BLOG_DATA.filter(post => post.categoryId === activeCategory)

    const featuredPost = BLOG_DATA[0]
    const regularPosts = activeCategory === "all"
        ? filteredPosts.slice(1)
        : filteredPosts

    return (
        <main className="min-h-screen bg-[#F5F5F0] font-poppins text-[#3E2C1C]">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-[#3E2C1C] to-[#2a1f14]">
                <div className="container px-6 mx-auto max-w-6xl">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
                        <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em]">
                            Daring Tribe Blog
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold font-cinzel leading-none tracking-tight text-white mb-6">
                        Insights <span className="italic font-normal text-[#D4AF37]">& Updates</span>
                    </h1>
                    <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
                        Your go-to resource for real estate knowledge, success stories, and everything happening in the Daring Tribe community.
                    </p>
                </div>
            </section>

            {/* Category Navigation */}
            <section className="sticky top-0 z-40 bg-[#F5F5F0]/95 backdrop-blur-md border-b border-[#3E2C1C]/10">
                <div className="container px-6 mx-auto max-w-6xl">
                    <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                                    activeCategory === cat.id
                                        ? 'bg-[#3E2C1C] text-white shadow-lg'
                                        : 'bg-white text-[#3E2C1C]/70 hover:bg-[#3E2C1C]/5 border border-[#3E2C1C]/10 hover:border-[#3E2C1C]/20'
                                }`}
                            >
                                {cat.id !== "all" && (
                                    <span className={activeCategory === cat.id ? 'text-[#D4AF37]' : 'text-[#D4AF37]/70'}>
                                        {CATEGORY_ICONS[cat.id]}
                                    </span>
                                )}
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Category Description */}
            <AnimatePresence mode="wait">
                {activeCategory !== "all" && (
                    <motion.section
                        key={activeCategory}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="container px-6 mx-auto max-w-6xl py-6">
                            <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-[#D4AF37]/10 to-transparent rounded-2xl border-l-4 border-[#D4AF37]">
                                <div className="p-2 bg-[#D4AF37]/20 rounded-lg text-[#D4AF37]">
                                    {CATEGORY_ICONS[activeCategory]}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#3E2C1C] mb-1">
                                        {CATEGORIES.find(c => c.id === activeCategory)?.name}
                                    </h3>
                                    <p className="text-sm text-[#3E2C1C]/60 leading-relaxed">
                                        {CATEGORIES.find(c => c.id === activeCategory)?.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Featured Post - Only show when "All Categories" is selected */}
            {activeCategory === "all" && (
                <section className="container px-6 mx-auto max-w-6xl py-12">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-[#3E2C1C]/40">
                            Featured Article
                        </h2>
                    </div>

                    <Link href={`/blog/${featuredPost.slug}`} className="group block">
                        <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                            {/* Image */}
                            <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                                <Image
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r" />

                                {/* Category Badge */}
                                <div className="absolute top-6 left-6">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] rounded-full text-xs font-bold uppercase tracking-wider text-white">
                                        {CATEGORY_ICONS[featuredPost.categoryId]}
                                        {featuredPost.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-[#3E2C1C]/40 mb-4">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {featuredPost.date}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-[#3E2C1C]/20" />
                                    <span className="flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5" />
                                        {featuredPost.author}
                                    </span>
                                </div>

                                <h3 className="text-2xl lg:text-4xl font-bold font-cinzel mb-4 group-hover:text-[#D4AF37] transition-colors leading-tight">
                                    {featuredPost.title}
                                </h3>

                                <p className="text-[#3E2C1C]/60 leading-relaxed mb-6 text-lg">
                                    {featuredPost.excerpt}
                                </p>

                                <div className="flex items-center gap-2 text-[#D4AF37] font-semibold group-hover:gap-4 transition-all">
                                    Read Article
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* Blog Grid */}
            <section className="container px-6 mx-auto max-w-6xl pb-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#3E2C1C]/40">
                        {activeCategory === "all" ? "Latest Articles" : `${filteredPosts.length} Articles`}
                    </h2>
                </div>

                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {regularPosts.map((post, index) => (
                            <motion.article
                                layout
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <Link href={`/blog/${post.slug}`} className="group block h-full">
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                                        {/* Image */}
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />

                                            {/* Category Badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-[#3E2C1C]">
                                                    <span className="text-[#D4AF37]">{CATEGORY_ICONS[post.categoryId]}</span>
                                                    {post.category}
                                                </span>
                                            </div>

                                            {/* Date Overlay */}
                                            <div className="absolute bottom-4 left-4">
                                                <span className="text-white/90 text-xs font-medium uppercase tracking-wider">
                                                    {post.date}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-lg font-bold font-cinzel mb-3 group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
                                                {post.title}
                                            </h3>

                                            <p className="text-[#3E2C1C]/60 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-[#3E2C1C]/5">
                                                <span className="flex items-center gap-2 text-xs text-[#3E2C1C]/50">
                                                    <User className="w-3.5 h-3.5" />
                                                    {post.author}
                                                </span>
                                                <span className="flex items-center gap-1 text-[#D4AF37] text-sm font-medium group-hover:gap-2 transition-all">
                                                    Read
                                                    <ChevronRight className="w-4 h-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-[#3E2C1C]/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-8 h-8 text-[#3E2C1C]/20" />
                        </div>
                        <p className="text-[#3E2C1C]/40 text-lg">No articles found in this category yet.</p>
                        <p className="text-[#3E2C1C]/30 text-sm mt-2">Check back soon for new content!</p>
                    </div>
                )}
            </section>

            {/* Newsletter CTA */}
            <section className="bg-[#3E2C1C] py-20">
                <div className="container px-6 mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-cinzel text-white mb-4">
                        Stay <span className="text-[#D4AF37] italic font-normal">Updated</span>
                    </h2>
                    <p className="text-white/60 mb-8 max-w-xl mx-auto">
                        Get the latest real estate insights, success stories, and Daring Tribe updates delivered to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                        <button className="px-8 py-4 bg-[#D4AF37] text-[#3E2C1C] font-semibold rounded-full hover:bg-[#c9a432] transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
