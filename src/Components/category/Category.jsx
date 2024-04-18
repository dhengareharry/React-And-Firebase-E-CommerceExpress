import React from 'react'
import './Category.css'
import {useNavigate} from 'react-router-dom'
const category = [
    {
        image: 'https://cdn-icons-png.flaticon.com/256/4359/4359963.png',
        name: 'fashion'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/11833/11833323.png',
        name: 'shirt'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/8174/8174424.png',
        name: 'jacket'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/7648/7648246.png',
        name: 'mobile'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/12142/12142416.png',
        name: 'laptop'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/10686/10686553.png',
        name: 'shoes'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/12114/12114279.png',
        name: 'home'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/11946/11946316.png',
        name: 'books'
    }
]
const Category = () => {
    const navigate = useNavigate()
  return (
    <div className='category-container'>
        <div className='category-main'>
            <div className='category-main2'>
                {
                    category.map((item,index)=>{
                        return(
                            <div className='category-image-container' key={index}>
                                <div className='category-image-main' onClick={()=>{navigate(`/category/${item.name}`)}}>
                                  <div className='category-image-main2'>
                                  <img src={item.image} alt={item.name}/>
                                  </div>
                                </div>
                                <h1>{item.name}</h1>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: ".hide-scroll-bar {  -ms-overflow-style: none;  scrollbar-width: none;}.hide-scroll-bar::-webkit-scrollbar {  display: none;}" }} />
    </div>
  )
}

export default Category