import Link from "next/link";

export function Footer() {
  return (
    <footer id="contacts" className="border-t border-[#E5E5E5] bg-white mt-16 scroll-mt-20">
      <div className="container mx-auto px-4 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 mb-3">
            <img
              src="/images/logo.png"
              alt="Smart Bar"
              className="h-12 w-12"
            />
            <span className="text-3xl font-medium text-[#0A0A0A] leading-none">
              smart bar
            </span>
          </Link>
          <p className="text-sm text-[#737373] leading-relaxed">
            Кава та чай з доставкою по Україні.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-[#0A0A0A]">Магазин</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/#catalog" className="text-[#737373] hover:text-[#FACC15] transition">Усі товари</a></li>
            <li><a href="/#catalog" className="text-[#737373] hover:text-[#FACC15] transition">Кава</a></li>
            <li><a href="/#catalog" className="text-[#737373] hover:text-[#FACC15] transition">Чай</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-[#0A0A0A]">Інформація</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#about" className="text-[#737373] hover:text-[#FACC15] transition">Про нас</Link></li>
            <li><Link href="/#delivery" className="text-[#737373] hover:text-[#FACC15] transition">Доставка та оплата</Link></li>
            <li><Link href="/#contacts" className="text-[#737373] hover:text-[#FACC15] transition">Контакти</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-[#0A0A0A]">Контакти</h4>
          <ul className="space-y-2 text-sm text-[#737373]">
            <li>+380 XX XXX XX XX</li>
            <li>info@smartbar.ua</li>
            <li className="flex gap-3 mt-3">
              <a href="#" className="hover:text-[#FACC15] transition">Instagram</a>
              <a href="#" className="hover:text-[#FACC15] transition">Telegram</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#E5E5E5] py-4 text-center text-xs text-[#737373]">
        © {new Date().getFullYear()} Smart Bar. Усі права захищені.
      </div>
    </footer>
  );
}
