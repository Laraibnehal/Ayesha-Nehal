import React from 'react'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Heart, Lightbulb, File } from 'lucide-react';
import bannerOne from '../../assets/banner-1.jpg'
import sleeve from '../../assets/sleeve.jpg'
function TimeLine() {
  return (
    <div>
<VerticalTimeline>
  {/* <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date="2011 - present"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    // icon={<WorkIcon />}
  >
    <h3 className="vertical-timeline-element-title">Creative Director</h3>
    <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    <p>
      Creative Direction, User Experience, Visual Design, Project Management, Team Leading
    </p>
  </VerticalTimelineElement> */}
  {/* <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="2010 - 2011"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    // icon={<WorkIcon />}
  >
    <h3 className="vertical-timeline-element-title">Art Director</h3>
    <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
    <p>
      Creative Direction, User Experience, Visual Design, SEO, Online Marketing
    </p>
  </VerticalTimelineElement> */}
  {/* <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="2008 - 2010"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    // icon={<WorkIcon />}
  >
    <h3 className="vertical-timeline-element-title">Web Designer</h3>
    <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
    <p>
      User Experience, Visual Design
    </p>
  </VerticalTimelineElement> */}
  {/* <VerticalTimelineElement
    className="vertical-timeline-element--work"
    // date="2006 - 2008"
    iconStyle={{ background: '#6c6e5c', color: '#fff' 
   

    }}
    // icon={<WorkIcon />}
  >
    {/* <h3 className="vertical-timeline-element-title">Web Designer</h3>
    <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
    <p>
      User Experience, Visual Design
    </p> */}
  {/* </VerticalTimelineElement> */ }
  <VerticalTimelineElement
    date = { <img src={bannerOne}  className='w-32 h-32 object-fit opacity-1 z-50'/>}
    className=""
    iconStyle={{ background: '#6c6e5c', color: '#fff', fontSize: '1rem' }}
    icon={<File />}
  >
    <h3 className="vertical-timeline-element-title">
   
    You See Our Post</h3>
    <h4 className="vertical-timeline-element-subtitle"></h4>
    <p>
    You’re scrolling through your feed when—bam!—a gorgeous hijab pic steals your heart
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    date = {<img src={sleeve} className=' w-32 h-32'/>}
    iconStyle={{ background: '#6c6e5c', color: '#fff' }}
    icon={<Heart />}
  >
    <p>
    You Double-Tap
    </p>
    <h3 className="vertical-timeline-element-title">Love at first sight? We knew it! You can’t resist liking our post.</h3>
    {/* <h4 className="vertical-timeline-element-subtitle">Certification</h4> */}
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education object-contain"
    date = {<img src={bannerOne}  className='w-[50%] '/> }
    iconStyle={{ background: '#6c6e5c', color: '#fff' }}
    icon={<Lightbulb />}
  >
    <p>
    You Place an Order 📦
    </p>
    <h3 className="vertical-timeline-element-title">You slide into our DMs, and voilà—you’re just a delivery away from beautiful hijab.</h3>
  </VerticalTimelineElement>
  {/* <VerticalTimelineElement
    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
    // icon={<StarIcon />}
  /> */}
</VerticalTimeline>
    </div>
  )
}

export default TimeLine

// import React from 'react'; 
// import { Timeline } from 'primereact/timeline';
// import { Card } from '../ui/card';
// import { Button } from '../ui/button';
// // import './TimelineDemo.css';
// import { ShoppingCart } from 'lucide-react';

// export default function TemplateDemo() {
//         const events = [
//         { status: 'You See Our Post', date: '15/10/2020 10:30', icon: <ShoppingCart />, color: '#9C27B0', image: 'game-controller.jpg' },
//         { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
//         { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
//         { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
//     ];

//     const customizedMarker = (item) => {
//         return (
//             <span className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1" style={{ backgroundColor: item.color }}>
//                 <i className={item.icon}></i>
//             </span>
//         );
//     };

//    const customizedContent = (item) => {
//        return (
//           <Card title={item.status} subTitle={item.date}>
//               { item.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${item.image}`} alt={item.name} width={300} className="shadow-1" />}
//               <h3>You See Our Post</h3>
//               <p> You’re scrolling through your feed when—bam!—a gorgeous hijab pic steals your heart</p>
//               {/* <Button label="Read more" className="p-button-text"></Button> */}
//           </Card>
//        );
//    };
        
//    return (
//       <div className="card">
//           <Timeline value={events} align="alternate" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
//       </div>
//    )
// }
        