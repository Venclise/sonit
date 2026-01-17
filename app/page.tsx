import Category from '@/sections/category'
import HeroSlider from '@/sections/HeroSlider'
import React from 'react'

export default function page() {
  return (
    <div className='w-full h-screen py-10 px-5 mt-12'>
      <HeroSlider />
      <Category />
    </div>
  )
}
