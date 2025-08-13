import './footer.css'
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import CloudIcon from '@mui/icons-material/Cloud';
export const Footer=()=>{
  const todayDate=new Date();
  return(
    <div className='footer'>
      <div className='footer-left'>
       <img className="footer-logo"src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm4TblQ9sjUgYhQ5ASLXZKKn_bFXpd9N2uvg&s" alt="" />
       <div className='footer-text-white'>National Institue Of Technology</div>
       <div className='footer-text-white'>Rourkela</div>
       <div className='footer-text-smaller'>Rourkela,Sundargraha(Jagda)-769008</div>
       <div className='footer-text-smaller'>
        <PhoneIcon/>(0661)246-2020/2002</div>
       <div className='footer-text-smaller'>
        <LanguageIcon/>
        www.nitrkl.ac.in
       </div>
      </div>
      <div className='footer-center'>
        <div className='important-link'>
         Important Links
        </div>
        <a href="https://nitrkl.ac.in/Student/AntiRagging">Anti-Ragging Initiative</a>
        <a href="https://nitrkl.ac.in/CDC">Career Counseling and Placement Section</a>
        <a href="https://www.nitrkl.ac.in/">Special Cell</a>
        <a href="https://www.nitrkl.ac.in/Student/GrievanceCell">Grivance Cell</a>
        <a href="https://nitrkl.ac.in/eptp/ContactUs.aspx">Contact Us</a>
        <a href="https://www.nitrkl.ac.in/">College Official Website</a>
      </div>
      <div className='footer-right'>
           <div className='footer-right-name'>
           <CloudIcon/>
            NIT Rourkela</div>
           <div>{todayDate.toDateString()}</div>
      </div>
       
    </div>
  )
}