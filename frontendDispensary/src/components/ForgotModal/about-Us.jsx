import "../About-Us/about-Us.css";

export const AboutUs=()=>{
  return(
    <div className='about-us'>
        <p>The NIT Rourkela college dispensary provides essential medical facilities to students, faculty, and staff. It operates with qualified doctors and nursing staff, offering first aid, outpatient care, and emergency services. The dispensary plays a crucial role in maintaining campus health, ensuring timely treatment and promoting overall well-being within the institute.</p>
      <a className="about-link"href="https://www.nitrkl.ac.in/docs/Regulation_Form/Regulation/20092018170904660.pdf">Sops for NIT Rourkela Health Center Services</a>
      <p className='about-staffHeader'>Staff with their visiting days as follows</p>
      <ul>
        <li>Health Center timings:Monday to Saturday 8AM to 9PM</li>
        <li>Doctor Consultation Timings:Monday to Friday 10 AM to 5 PM and Saturday 10 AM to 1:30 PM</li>
      </ul>
    </div>
  )
}