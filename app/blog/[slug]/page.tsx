import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Calendar, User, ArrowLeft, BookOpen, Megaphone, Users, GraduationCap, Share2, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogPost, getRelatedPosts, getCategoryById, BLOG_DATA } from "@/lib/blog-data"

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    salesbook: <BookOpen className="w-4 h-4" />,
    community: <Users className="w-4 h-4" />,
    insights: <GraduationCap className="w-4 h-4" />,
    daring: <Megaphone className="w-4 h-4" />,
}

export async function generateStaticParams() {
    return BLOG_DATA.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = getBlogPost(slug)

    if (!post) {
        return {
            title: "Post Not Found | Daring Tribe Blog",
        }
    }

    return {
        title: `${post.title} | Daring Tribe Blog`,
        description: post.excerpt,
    }
}

function estimateReadTime(content: string): number {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = getBlogPost(slug)

    if (!post) {
        notFound()
    }

    const relatedPosts = getRelatedPosts(slug, post.categoryId, 3)
    const category = getCategoryById(post.categoryId)
    const readTime = estimateReadTime(post.content)

    return (
        <main className="min-h-screen bg-[#F5F5F0] font-poppins text-[#3E2C1C]">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-24 pb-0">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 h-[70vh]">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#3E2C1C]/80 via-[#3E2C1C]/70 to-[#F5F5F0]" />
                </div>

                {/* Content */}
                <div className="relative container px-6 mx-auto max-w-4xl pt-12 pb-32">
                    {/* Back Link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>

                    {/* Category Badge */}
                    <div className="mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] rounded-full text-xs font-bold uppercase tracking-wider text-white">
                            {CATEGORY_ICONS[post.categoryId]}
                            {post.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-cinzel text-white leading-tight mb-8">
                        {post.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 text-white/70">
                        <span className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {post.author}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {readTime} min read
                        </span>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="relative -mt-16 pb-20">
                <div className="container px-6 mx-auto max-w-4xl">
                    {/* Article Card */}
                    <article className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                        {/* Featured Image */}
                        <div className="relative aspect-[21/9] overflow-hidden">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Article Body */}
                        <div className="p-8 md:p-12 lg:p-16">
                            {/* Excerpt/Lead */}
                            <p className="text-xl md:text-2xl text-[#3E2C1C]/70 leading-relaxed mb-10 font-light border-l-4 border-[#D4AF37] pl-6">
                                {post.excerpt}
                            </p>

                            {/* Content */}
                            <div className="prose prose-lg max-w-none prose-headings:font-cinzel prose-headings:text-[#3E2C1C] prose-p:text-[#3E2C1C]/70 prose-p:leading-relaxed prose-strong:text-[#3E2C1C] prose-em:text-[#D4AF37] prose-li:text-[#3E2C1C]/70">
                                {post.content.split('\n\n').map((paragraph, index) => {
                                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                                        // Heading
                                        const text = paragraph.slice(2, -2)
                                        return (
                                            <h2 key={index} className="text-2xl font-bold mt-10 mb-4">
                                                {text}
                                            </h2>
                                        )
                                    } else if (paragraph.startsWith('**')) {
                                        // Bold heading followed by content
                                        const match = paragraph.match(/^\*\*(.+?)\*\*(.*)/)
                                        if (match) {
                                            return (
                                                <div key={index}>
                                                    <h3 className="text-xl font-bold mt-8 mb-3">{match[1]}</h3>
                                                    {match[2] && <p className="mb-4">{match[2]}</p>}
                                                </div>
                                            )
                                        }
                                    } else if (paragraph.startsWith('- ')) {
                                        // List items
                                        const items = paragraph.split('\n').filter(item => item.startsWith('- '))
                                        return (
                                            <ul key={index} className="list-disc pl-6 space-y-2 my-4">
                                                {items.map((item, i) => (
                                                    <li key={i}>{item.slice(2)}</li>
                                                ))}
                                            </ul>
                                        )
                                    } else if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                                        // Italic (quote or emphasis)
                                        const text = paragraph.slice(1, -1)
                                        return (
                                            <blockquote key={index} className="border-l-4 border-[#D4AF37] pl-6 italic text-[#3E2C1C]/60 my-6">
                                                {text}
                                            </blockquote>
                                        )
                                    } else if (paragraph.match(/^\d+\./)) {
                                        // Numbered list
                                        const items = paragraph.split('\n').filter(item => item.match(/^\d+\./))
                                        return (
                                            <ol key={index} className="list-decimal pl-6 space-y-2 my-4">
                                                {items.map((item, i) => (
                                                    <li key={i}>{item.replace(/^\d+\.\s*/, '')}</li>
                                                ))}
                                            </ol>
                                        )
                                    }
                                    return (
                                        <p key={index} className="mb-4">
                                            {paragraph}
                                        </p>
                                    )
                                })}
                            </div>

                            {/* Share Section */}
                            <div className="mt-12 pt-8 border-t border-[#3E2C1C]/10">
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    {/* <div className="flex items-center gap-4">
                                        <span className="text-sm font-medium text-[#3E2C1C]/50">Share this article:</span>
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 rounded-full bg-[#3E2C1C]/5 hover:bg-[#D4AF37]/20 transition-colors">
                                                <Share2 className="w-4 h-4 text-[#3E2C1C]/60" />
                                            </button>
                                        </div>
                                    </div> */}
                                    <Link
                                        href="/blog"
                                        className="inline-flex items-center gap-2 text-[#D4AF37] font-semibold hover:gap-3 transition-all"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back to all articles
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
                <section className="py-20 bg-[#3E2C1C]">
                    <div className="container px-6 mx-auto max-w-6xl">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-2">Keep Reading</p>
                                <h2 className="text-3xl font-bold font-cinzel text-white">
                                    Related Articles
                                </h2>
                            </div>
                            <Link
                                href={`/blog?category=${post.categoryId}`}
                                className="hidden md:inline-flex items-center gap-2 text-white/70 hover:text-[#D4AF37] text-sm font-medium transition-colors"
                            >
                                View all in {category?.name}
                                <ArrowLeft className="w-4 h-4 rotate-180" />
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    href={`/blog/${relatedPost.slug}`}
                                    className="group block"
                                >
                                    <article className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300">
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <Image
                                                src={relatedPost.image}
                                                alt={relatedPost.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2">
                                                {relatedPost.date}
                                            </p>
                                            <h3 className="text-lg font-bold font-cinzel text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                                                {relatedPost.title}
                                            </h3>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-b from-[#3E2C1C] to-[#2a1f14]">
                <div className="container px-6 mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-cinzel text-white mb-4">
                        Ready to Start Your <span className="text-[#D4AF37] italic font-normal">Journey?</span>
                    </h2>
                    <p className="text-white/60 mb-8 max-w-xl mx-auto">
                        Join the Daring Tribe community and learn from the best in real estate.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/course"
                            className="px-8 py-4 bg-[#D4AF37] text-[#3E2C1C] font-semibold rounded-full hover:bg-[#c9a432] transition-colors"
                        >
                            Join the Bootcamp
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border border-white/30 hover:border-white hover:bg-white/5 transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
