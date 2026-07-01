import Navbar from "../../components/Navbar/Navbar";
import Hero from '../../components/Hero/Hero';
import Projects from '../../components/Projects/Projects';
import Skills from "../../components/Skills/Skills";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import About from "../../components/About/About";
import Timeline from "../../components/Timeline/Timeline";
import { getUser } from "../../redux/slices/userSlice";
import { getSkill } from "../../redux/slices/skillsSlice";
import { getProject } from "../../redux/slices/projectSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUser());
    dispatch(getSkill());
    dispatch(getProject());
  }, []);

  return (
    <>
      <section className='section' id="Home">
        <Navbar />
        <Hero />
      </section>
      <section className="section" id="About"><About /></section>
      <section className='section' id="Certifications"><Timeline /></section>
      <section className='section' id="Project"><Projects /></section>
      <section className='section' id="Skill"><Skills /></section>
      <section className="section" id="Contact">
        <Contact />
        <Footer />
      </section>
    </>
  )
}

export default Home;
