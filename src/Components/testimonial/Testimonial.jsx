import React from 'react'
import './testimonial.css'
const Testimonial = () => {
  return (
    <div>
        <section className='testimonial-section'>
            <div className='testimonial'>
                <h1 className='testimonial-heading'>Testimonial</h1>
                <h2 className='testimonial-para'>What our <span className='customers'>customers</span> are saying</h2>
                <div className='testimonial-container' >
                 <div className="lg:w-1/3 lg:mb-0 mb-6 p-4" >
                    <div className='testimonial-content'>
                        <img src='https://cdn-icons-png.flaticon.com/128/1077/1077012.png'/>
                        <p>Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                        <span/>
                        <h2>XYZ</h2>
                        <p className='p'>Senior Product Designer</p>
                    </div>
                 </div>

                 <div className="lg:w-1/3 lg:mb-0 mb-6 p-4" >
                    <div className='testimonial-content'>
                        <img src='https://cdn-icons-png.flaticon.com/128/1077/1077012.png'/>
                        <p>Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                        <span/>
                        <h2>XYZ</h2>
                        <p>UI Developer</p>
                    </div>
                 </div>

                 <div className="lg:w-1/3 lg:mb-0 mb-6 p-4" >
                    <div className='testimonial-content'>
                        <img src='https://cdn-icons-png.flaticon.com/128/1077/1077012.png'/>
                        <p>Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                        <span/>
                        <h2>XYZ</h2>
                        <p>CTO</p>
                    </div>
                 </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Testimonial