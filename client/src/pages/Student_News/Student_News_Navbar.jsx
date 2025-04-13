import React from 'react'
import { Link } from "react-router-dom"

function Student_News_Navbar() {
    const categories = [
        {"name": "Sosial", "path": "/StudentNews/category?category=Sosial"},
        {"name": "Hiburan", "path": "/StudentNews/category?category=Hiburan"},
        {"name": "Bisnis", "path": "/StudentNews/category?category=Bisnis"},
        {"name": "Lifestyle", "path": "/StudentNews/category?category=Lifestyle"},
        {"name": "Olaharga", "path": "/StudentNews/category?category=Olahraga"}
    ]

  return (
    <div className="bg-[#2e2e2e] text-white">
      <ul className=" HelveticaBold flex flex-row gap-[35px] overflow-x-auto pl-[30px] pr-[30px] h-[50px] justify-between items-center">
        {categories.map((category) => (
          <li key={category.name} className="shrink-0">
            <Link to={category.path} className="text-200px]">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Student_News_Navbar