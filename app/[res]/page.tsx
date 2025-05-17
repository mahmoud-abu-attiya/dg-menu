"use client"
import { Facebook, Instagram, Phone, PinIcon, Volume2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { LanguageSelector } from "@/components/language-selector"
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

const Modern = () => {
  const { start } = useTextToSpeech();
  const [activeCategory, setActiveCategory] = useState<number>(0)
  const mainColor = "orange" // red
  const branch_data = {
    name: "Branch Name",
    address: "Branch Address",
    phone: ["+1234567890", "+0987654321"],
    location: "https://maps.google.com/?q=Branch+Location",
    image: "https://www.superdigitalmenu.com/img/web/202444951196491640805.png",
    facebook: "https://facebook.com/branch",
    instagram: "https://instagram.com/branch",
  }
  const item = {
    id: 1,
    name: "Item Name",
    description: "Boost revenue and customer loyalty. Modern. Fast. Simple.",
    price: 10.99,
    image: "https://d1al919q0eoae3.cloudfront.net/fit-in/450x320/eu-central-1:55921a2f-e357-4b1c-9933-cf005e6c5d11/87d7e9b3-7327-424e-a2b0-9ef96454c091_1686759964305.webp",
    category: "Category",
    tags: ["Tag1", "Tag2"],
  }
  return (
    <main className='container max-w-3xl p-4'>
      <section className="rounded-xl text-white h-60 overflow-hidden" style={{ backgroundImage: `url(${branch_data.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="flex flex-col justify-end p-6 w-full h-full" style={{ backgroundImage: `linear-gradient(to top, ${mainColor}, transparent)` }}>
          <div className="self-end mb-auto">
            <LanguageSelector />
          </div>
          <h1 className="text-white text-3xl font-bold">{branch_data.name}</h1>
          <span className="text-sm text-gray-100">{"Address: " + branch_data.address}</span>
          <span className="text-sm text-gray-100">{"Phones: " + branch_data.phone[0] + ", " + branch_data.phone[1]}</span>
          <div className="flex gap-4">
            {branch_data.facebook && <Link href={branch_data.facebook} className="bg-gray-600/50 hover:bg-gray-600 p-2 transition rounded-xl w-fit">
              <Facebook />
            </Link>}
            {branch_data.location && <Link href={branch_data.location} className="bg-gray-600/50 hover:bg-gray-600 p-2 transition rounded-xl w-fit">
              <PinIcon />
            </Link>}
            {branch_data.instagram && <Link href={branch_data.instagram} className="bg-gray-600/50 hover:bg-gray-600 p-2 transition rounded-xl w-fit">
              <Instagram />
            </Link>}
            {branch_data.phone && <Link href={`tel:${branch_data.phone}`} className="bg-green-600 p-2 transition rounded-xl w-fit flex items-center gap-2 justify-end">
              <Phone size={20} /> Call Us
            </Link>}
          </div>
        </div>
      </section>
      <section className="bg-gray-100 shadow-md rounded-xl p-2 my-4 sticky top-4 flex gap-2 overflow-auto">
        {[
          'Main Course',
          'Appetizers',
          'Desserts',
          'Beverages',
          'Specials',
          'Kids Menu'
        ].map((name, index) => (
          <span
            key={index}
            onClick={() => setActiveCategory(index)}
            className={`grow text-center cursor-pointer p-4 whitespace-nowrap rounded-xl transition-all ${index === activeCategory ? "shadow text-white" : "shadow-inner"}`} style={{ backgroundColor: index === activeCategory ? mainColor : "#f9fafb" }}>{name}</span>
        ))}
      </section>
      <section className="">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="bg-white shadow-md rounded-2xl p-2 md:p-4 border flex flex-col gap-2 md:gap-4" style={{ borderColor: mainColor }}>
              <img src={item.image} alt={item.name} className="rounded-xl" />
              <div className="flex gap-2 items-center">
                <h3 className="text-lg font-bold" style={{ color: mainColor }}>{item.name}</h3>
                <button onClick={() => start(item.name, "en")} className="p-2 text-gray-300 rounded-full hover:bg-gray-100 transition">
                  {<Volume2 size={20} />}
                </button>
              </div>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <p className="text-xl font-bold w-full text-center text-white rounded-xl p-2" style={{ backgroundColor: mainColor }}>${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Modern