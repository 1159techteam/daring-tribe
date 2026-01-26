import { Instagram, Youtube, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-primary py-12 sm:py-16">
      <div className="container px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8 sm:mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground">
                  Daring <span className="text-accent">Tribe</span>
                </h3>
                <p className="text-xs sm:text-sm text-primary-foreground/70 mt-1">Powered by 1159 Realty</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-4 font-semibold text-primary-foreground text-sm sm:text-base">Community</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-primary-foreground/70">
                <li>
                  <Link href="/about" className="hover:text-accent transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/how-to-join" className="hover:text-accent transition-colors">
                    How to Join
                  </Link>
                </li>
                <li>
                  <Link href="/success-stories" className="hover:text-accent transition-colors">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="/training" className="hover:text-accent transition-colors">
                    Training Program
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="mb-4 font-semibold text-primary-foreground text-sm sm:text-base">Resources</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-primary-foreground/70">
                <li>
                  <a href="https://1159realty.com/land/" className="hover:text-accent transition-colors">
                    Browse Properties
                  </a>
                </li>
                <li>
                  <a href="https://1159realty.com/apartments/" className="hover:text-accent transition-colors">
                    Apartment Reservations
                  </a>
                </li>
                <li>
                  <a href="mailto:info@1159realty.com?subject=Blog%20and%20Insights" className="hover:text-accent transition-colors">
                    Blog & Insights
                  </a>
                </li>
                <li>
                  <a href="mailto:info@1159realty.com?subject=Support%20Request" className="hover:text-accent transition-colors">
                    Support Center
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 font-semibold text-primary-foreground text-sm sm:text-base">Contact</h4>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-primary-foreground/70">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm">
                    No. 23, Offa Road, Opposite Kwara State Registry, Ilorin, Kwara State
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-accent shrink-0" />
                  <a href="tel:08061747003" className="hover:text-accent transition-colors text-xs sm:text-sm">
                    08061747003
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-accent shrink-0" />
                  <a
                    href="mailto:info@1159realty.com"
                    className="hover:text-accent transition-colors text-xs sm:text-sm"
                  >
                    info@1159realty.com
                  </a>
                </li>
              </ul>

              {/* Social Links */}
              <div className="mt-4 sm:mt-6 flex gap-3 sm:gap-4">
                <a
                  href="http://www.instagram.com/1159_realty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all"
                >
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a
                  href="https://youtube.com/@1159realty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all"
                >
                  <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a
                  href="http://www.facebook.com/1159realty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all"
                >
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/1159realty/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all"
                >
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-primary-foreground/20 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <p className="text-xs sm:text-sm text-primary-foreground/70">
                © {new Date().getFullYear()} Daring Tribe. All rights reserved. Partnering with{" "}
                <a href="https://1159realty.com" className="text-accent hover:underline">
                  1159 Realty
                </a>
              </p>
              <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-primary-foreground/70">
                <a href="https://1159realty.com/privacy-policy" className="hover:text-accent transition-colors">
                  Privacy Policy
                </a>
                <a href="https://1159realty.com/terms-of-service" className="hover:text-accent transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
