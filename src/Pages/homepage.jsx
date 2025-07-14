import React from 'react';
import { useNavigate } from 'react-router-dom';
import apHero from '../assets/ap-hero.svg';
import createImg from '../assets/create.png';
import inviteImg from '../assets/invite.png';
import settingsImg from '../assets/settings.png';
import resultsImg from '../assets/results.png';
import avatar1 from '../assets/avatar-1.svg';
import avatar2 from '../assets/avatar-2.svg';
import avatar3 from '../assets/avatar-3.svg';
import avatar4 from '../assets/avatar-4.svg';
import avatar5 from '../assets/avatar-5.svg';
import avatar6 from '../assets/avatar-6.svg';

// TestimonialCard and HateTestimonials components
const TestimonialCard = ({ avatar, quote, position }) => (
  <div className="testimonial-card" style={{ position: 'absolute', ...position }}>
    <img src={avatar} alt="avatar" style={{ width: 60, height: 60, borderRadius: '50%', flexShrink: 0 }} />
    <div className="quote-bubble">
      <p>"{quote}"</p>
    </div>
  </div>
);

function HateTestimonials() {
  const testimonials = [
    {
      avatar: avatar1,
      quote: "Whoever created AutoProctor, I hope you choke",
      position: { top: '200px', left: '50px' }
    },
    {
      avatar: avatar2,
      quote: "She might be AutoProctor, because she never trusted me enough",
      position: { top: '320px', left: '200px' }
    },
    {
      avatar: avatar3,
      quote: "AutoProctor is the work of the devil",
      position: { top: '180px', left: '380px' }
    },
    {
      avatar: avatar4,
      quote: "Did I just hear the mom's voice helping her child to cheat thru Autoproctor's noise detection..",
      position: { top: '340px', left: '520px' }
    },
    {
      avatar: avatar5,
      quote: "People who made AutoProctor are the living spawns of satan",
      position: { top: '160px', left: '720px' }
    },
    {
      avatar: avatar6,
      quote: "Who introduced AutoProctor to miss zahra I just wanna talk",
      position: { top: '300px', left: '860px' }
    }
  ];

  return (
    <div className="container">
      <style>{`
        .container {
          width: 100%;
          min-height: 100vh;
          background-color: #f8f9fa;
          position: relative;
          padding: 40px 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .header { text-align: center; margin-bottom: 60px; }
        .title { font-size: 48px; font-weight: 300; color: #333; margin: 0; line-height: 1.2; }
        .title .hate { position: relative; }
        .title .hate::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(45deg, transparent 40%, #ff0000 40%, #ff0000 60%, transparent 60%);
          z-index: 1; pointer-events: none;
        }
        .title .love { text-decoration: line-through; text-decoration-color: #ff0000; text-decoration-thickness: 3px; }
        .subtitle { font-size: 18px; color: #666; margin-top: 10px; font-weight: 400; }
        .testimonials-area { position: relative; height: 500px; max-width: 1200px; margin: 0 auto; }
        .testimonial-card { display: flex; align-items: flex-start; gap: 15px; max-width: 280px; }
        .quote-bubble { background: white; padding: 15px 18px; border-radius: 18px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); position: relative; flex: 1; }
        .quote-bubble::before { content: ''; position: absolute; left: -8px; top: 20px; width: 0; height: 0; border-right: 8px solid white; border-top: 8px solid transparent; border-bottom: 8px solid transparent; }
        .quote-bubble p { margin: 0; font-size: 14px; line-height: 1.4; color: #333; }
        @media (max-width: 1024px) {
          .testimonials-area { height: auto; position: static; }
          .testimonial-card { position: static !important; margin-bottom: 20px; max-width: 100%; }
        }
      `}</style>
      <div className="header">
        <h1 className="title">
          <span className="hate">Hate</span>
          <br />
          Our Users <span className="love">Love</span> us!
        </h1>
        <p className="subtitle">Real tweets from really pissed off candidates</p>
      </div>
      <div className="testimonials-area">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            avatar={testimonial.avatar}
            quote={testimonial.quote}
            position={testimonial.position}
          />
        ))}
      </div>
    </div>
  );
}

const AutoProctorLanding = () => {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '30px', fontWeight: '600', color: '#1f2937' }}>Examlytic</span>
          </div>
          
          {/* Navigation */}
          <nav style={{ display: 'flex', gap: '32px' }}>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '15px' }}>How to Use</a>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '15px' }}>API Integration</a>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '15px' }}>Pricing</a>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '15px' }}>Customers</a>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '15px' }}>FAQs</a>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '15px' }}>Help</a>
          </nav>
          
          {/* Login Button */}
          <button
            style={{
              backgroundColor: '#1f2937',
              color: 'white',
              padding: '8px 18px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '17px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '80px'
      }}>
        {/* Left Section */}
        <div style={{ flex: '1' }}>
          {/* Rating Section */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '32px',
            gap: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '18px' }}>📊</span>
              <span style={{ 
                color: '#3b82f6', 
                fontSize: '16px',
                fontWeight: '500'
              }}>38 Million+ Installs</span>
              <span style={{ fontSize: '14px', color: '#3b82f6' }}>↗</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px', fontWeight: '500' }}>4.5/5</span>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(4)].map((_, i) => (
                  <span key={i} style={{ color: '#fbbf24', fontSize: '16px' }}>★</span>
                ))}
                <span style={{ color: '#fbbf24', fontSize: '16px' }}>☆</span>
              </div>
              <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 style={{
            fontSize: '56px',
            fontWeight: '700',
            color: '#1f2937',
            lineHeight: '1.1',
            marginBottom: '35px',
            fontFamily: 'Georgia, serif'
          }}>
            Automated Proctoring to<br />
            Prevent Exam Cheating
          </h1>

          {/* Description */}
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            lineHeight: '1.6',
            marginBottom: '40px',
            maxWidth: '480px'
          }}>
            Our AI tracks candidate activity remotely. So, no more cheating on online tests.
          </p>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '16px',
            marginBottom: '16px'
          }}>

            <button style={{
              backgroundColor: '#064e3b',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Conduct An Exam
            </button>
          </div>
        </div>
        {/* Illustration */}
        <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={apHero} alt="Automated Proctoring Illustration" style={{ maxWidth: '100%', height: 'auto', maxHeight: '420px' }} />
        </div>
      </main>

      {/* Section Heading */}
      <h1 style={{
        fontSize: '56px',
        fontWeight: '700',
        color: '#1f2937',
        lineHeight: '1.1',
        marginBottom: '24px',
        fontFamily: 'Georgia, serif',
        textAlign: 'center',
      }}>
        Why Choose Examlytics?
      </h1>
      {/* Comparison Table Section */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '80px 24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '1200px',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            background: '#ffffff',
            borderBottom: '2px solid #f0f0f0',
            padding: '20px 25px',
            alignItems: 'center',
          }}>
            <div></div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#16a34a', letterSpacing: '-0.5px' }}>Examlytics</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <span style={{ color: '#9ca3af', fontSize: '18px', fontWeight: '500', lineHeight: '1.4' }}>Other proctoring<br />software</span>
            </div>
          </div>
          <div style={{ background: 'white' }}>
            {[
              { name: "Restrictive exam with device lockdown", smowl: true, other: true },
              { name: "Dual camera and human supervision", smowl: true, other: false },
              { name: "No need to install applications", smowl: true, other: false },
              { name: "Low internet consumption by capturing images instead of video", smowl: true, other: false },
              { name: "Fully integrated solution in your LMS educational platform", smowl: true, other: false },
              { name: "Customizable for any type of assessment: in-person and/or online", smowl: true, other: false },
              { name: "European company compliant with GDPR", smowl: true, other: false },
              { name: "Flexible licensing model (per exam/per user)", smowl: true, other: false },
            ].map((feature, index) => (
              <div key={index} style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr',
                padding: '15px 25px',
                borderBottom: '1px solid #f0f0f0',
                alignItems: 'center',
              }}>
                <div style={{ color: '#374151', fontSize: '18px', fontWeight: '400', lineHeight: '1.5', paddingRight: '15px' }}>{feature.name}</div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {feature.smowl ? (
                    <span style={{ color: '#16a34a', fontSize: '22px', fontWeight: 'bold' }}>✓</span>
                  ) : (
                    <span style={{ color: '#ef4444', fontSize: '22px', fontWeight: 'bold' }}>✗</span>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {feature.other ? (
                    <span style={{ color: '#16a34a', fontSize: '22px', fontWeight: 'bold' }}>✓</span>
                  ) : (
                    <span style={{ color: '#ef4444', fontSize: '22px', fontWeight: 'bold' }}>✗</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Render AutoProctorSection at the bottom of the homepage */}
      <AutoProctorSection />
      <HateTestimonials />
    </div>
  );
};

// Add AutoProctorSection component
const AutoProctorSection = () => {
  return (
    <div style={{
      background: '#2d5555',
      minHeight: '100vh',
      padding: '60px 0', // Remove horizontal padding here
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '56px',
          fontWeight: '700',
          color: 'white',
          lineHeight: '1.1',
          marginBottom: '50px',
          fontFamily: 'Georgia, serif',
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto 50px'
        }}>
          How to use Examlytics
        </h1>
        {/* Card Sections */}
        {/* Card 1 */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '60px',
          width: '100%', // Make card fill container width
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}>
          {/* Left Section */}
          <div>
            {/* Icon */}
            <div style={{
              width: '60px',
              height: '60px',
              background: '#a7f3d0',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '32px'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2">
                <path d="M6 2v6h.01M6 8.01l.01-.01M13 2v6h.01M13 8.01l.01-.01M6 8v2a6 6 0 0 0 12 0V8M6 8H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-2"/>
              </svg>
            </div>
            {/* Title */}
            <h2 style={{
              fontSize: '2.2rem',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '24px',
              lineHeight: '1.2'
            }}>
              Create your test
            </h2>
            {/* Description */}
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              color: '#6b7280',
              margin: 0
            }}>
              Use your preferred quiz platform—Google Forms, Microsoft Forms, or any custom platform. If you don't have one, you can even create a test directly using AutoProctor's Socratease Quizzes.
            </p>
          </div>
          {/* Right Section - Mockup */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={createImg} alt="Create Test" style={{ maxWidth: '320px', width: '100%', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }} />
          </div>
        </div>
        {/* Card 2 */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '60px',
          width: '100%',
          margin: '40px 0 0 0',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}>
          {/* Left Section */}
          <div>
            {/* Icon */}
            <div style={{
              width: '60px',
              height: '60px',
              background: '#fde68a',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '32px'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </div>
            {/* Title */}
            <h2 style={{
              fontSize: '2.2rem',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '24px',
              lineHeight: '1.2'
            }}>
              Set your proctoring settings
            </h2>
            {/* Description */}
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              color: '#6b7280',
              margin: 0
            }}>
              Decide how strictly you want to monitor the test. Choose from features like camera monitoring, tab-switch tracking, full-screen enforcement, microphone noise detection, and more. You can also add a timer, schedule the test, and set up candidate access rules.
            </p>
          </div>
          {/* Right Section - Mockup */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={inviteImg} alt="Proctoring Settings" style={{ maxWidth: '320px', width: '100%', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }} />
          </div>
        </div>
        {/* Card 3 */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '60px',
          width: '100%',
          margin: '40px 0 0 0',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}>
          {/* Left Section */}
          <div>
            {/* Icon */}
            <div style={{
              width: '60px',
              height: '60px',
              background: '#fde68a',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '32px'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </div>
            {/* Title */}
            <h2 style={{
              fontSize: '2.2rem',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '24px',
              lineHeight: '1.2'
            }}>
              Share the test link
            </h2>
            {/* Description */}
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              color: '#6b7280',
              margin: 0
            }}>
              Once your settings are ready, AutoProctor generates a unique test link. Just share this link with your candidates. They don't need to install anything—just open the link and start the test.
            </p>
          </div>
          {/* Right Section - Mockup */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={settingsImg} alt="Proctoring Settings" style={{ maxWidth: '320px', width: '100%', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }} />
          </div>
        </div>
        {/* Card 4 */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '60px',
          width: '100%',
          margin: '40px 0 0 0',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}>
          {/* Left Section */}
          <div>
            {/* Icon */}
            <div style={{
              width: '60px',
              height: '60px',
              background: '#fde68a',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '32px'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </div>
            {/* Title */}
            <h2 style={{
              fontSize: '2.2rem',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '24px',
              lineHeight: '1.2'
            }}>
              View results and trust scores
            </h2>
            {/* Description */}
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              color: '#6b7280',
              margin: 0
            }}>
              After candidates finish the test, you can view their responses and see detailed proctoring reports. These include screenshots, activity logs, and a Trust Score to help you decide whether to trust the result.
            </p>
          </div>
          {/* Right Section - Mockup */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={resultsImg} alt="Proctoring Settings" style={{ maxWidth: '320px', width: '100%', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Homepage = AutoProctorLanding;
export default Homepage;