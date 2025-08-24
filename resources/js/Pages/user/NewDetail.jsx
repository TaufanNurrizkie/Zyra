// resources/js/Pages/NewsDetail.jsx

import { useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  User,
  Share2,
  ChevronLeft,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function NewsDetail({ berita = [] }) {
  const { id } = useParams()
  const pageRef = useRef(null)
  const article = berita.find(item => item.id === parseInt(id))

  useEffect(() => {
    if (!article) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".article-content > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pageRef.current,
            start: "top 80%"
          }
        }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [article])

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Berita tidak ditemukan</h2>
          <Link to="/berita">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              Kembali ke Berita
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const shareUrl = `${window.location.origin}/berita/${article.id}`

  const handleShare = (platform) => {
    let url
    switch(platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`
        break
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        break
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`${article.title}\n\nBaca selengkapnya: ${shareUrl}`)}`
        break
      default:
        return
    }
    window.open(url, '_blank')
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/berita">
            <Button variant="ghost" className="flex items-center text-green-600 hover:text-green-700 hover:bg-green-50">
              <ChevronLeft className="w-5 h-5 mr-2" />
              Kembali ke Berita
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <Card className="overflow-hidden bg-white/80 backdrop-blur-md border-0 shadow-lg mb-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <User className="w-4 h-4 mr-1" />
                <span>{article.author}</span>
              </div>
              {article.category && (
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {article.category}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {article.title}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {article.excerpt}
            </p>
          </div>
        </Card>

        {/* Article Content */}
        <div className="article-content grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg p-6 md:p-8">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-7 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">Sub Judul Artikel</h2>

                <p className="text-gray-700 leading-7 mb-6">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-600 my-6">
                  "Ini adalah kutipan penting dari artikel yang memberikan penekanan pada poin tertentu dalam pembahasan."
                </blockquote>

                <p className="text-gray-700 leading-7 mb-6">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>

                <h3 className="text-xl font-bold text-gray-800 mb-4">Poin Penting Lainnya</h3>

                <ul className="list-disc pl-5 text-gray-700 mb-6">
                  <li className="mb-2">Poin pertama yang penting untuk diperhatikan</li>
                  <li className="mb-2">Poin kedua dengan informasi tambahan</li>
                  <li className="mb-2">Poin ketiga yang melengkapi pembahasan</li>
                  <li>Poin terakhir sebagai penutup rangkaian informasi</li>
                </ul>

                <p className="text-gray-700 leading-7">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                  sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Share Buttons */}
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg p-6 mb-6 sticky top-6">
              <h3 className="font-semibold text-gray-800 mb-4">Bagikan Artikel</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 min-w-[120px] mb-2"
                  onClick={() => handleShare('facebook')}
                >
                  <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                  Facebook
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 min-w-[120px] mb-2"
                  onClick={() => handleShare('twitter')}
                >
                  <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                  Twitter
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 min-w-[120px] mb-2"
                  onClick={() => handleShare('linkedin')}
                >
                  <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
                  LinkedIn
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 min-w-[120px]"
                  onClick={() => handleShare('email')}
                >
                  <Mail className="w-4 h-4 mr-2 text-gray-600" />
                  Email
                </Button>
              </div>
            </Card>

            {/* Related News */}
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Berita Terkait</h3>
              <div className="space-y-4">
                {berita.filter(item => item.id !== article.id).slice(0, 3).map(item => (
                  <Link
                    key={item.id}
                    to={`/berita/${item.id}`}
                    className="block p-3 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <p className="font-medium text-gray-800 line-clamp-2 mb-1">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
