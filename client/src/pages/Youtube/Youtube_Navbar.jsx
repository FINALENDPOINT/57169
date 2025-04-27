import React from 'react'
import { Link } from 'react-router-dom'
function Youtube_Navbar() {
    const categories = [
        {"name": "UPod", "path": "/Youtube/UnteyoPodcast"},
        {"name": "USer", "path": "/Youtube/UnteyoSeru"},
        {"name": "UTS", "path": "/Youtube/UnteyoTellingStories"},
        {"name": "UTif", "path": "/Youtube/UnteyoPerspektif"},
        {"name": "RuU", "path": "/Youtube/RuangUnteyo"},
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

export default Youtube_Navbar