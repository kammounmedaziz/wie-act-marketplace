import React, { useState, useEffect, useCallback, memo } from "react"
import Link from "next/link"
import { ExternalLink, Mail, Sparkles, LucideIcon } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'

// Component prop types
interface CTAButtonProps {
  href: string;
  text: string;
  icon: LucideIcon;
}

// Memoized Components
const StatusBadge = memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-pink-200/20">
        <span className="bg-gradient-to-r from-pink-600 to-rose-500 text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-pink-400" />
          Revolutionizing Agriculture
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-pink-400 to-rose-400 blur-2xl opacity-30"></span>
        <span className="relative bg-gradient-to-r from-gray-800 via-pink-700 to-rose-700 bg-clip-text text-transparent">
          AGRI-HOPE&nbsp;
        </span>
        <span className="relative bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          Marketplace
        </span>
      </span>
    </h1>
  </div>
));

const CTAButton = memo<CTAButtonProps>(({ href, text, icon: Icon }) => (
  <Link href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl opacity-60 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-11 bg-white/5 backdrop-blur-xl rounded-lg border border-pink-200/20 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-pink-500/20 to-rose-500/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-pink-100 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon className={`w-4 h-4 text-pink-200 ${text === 'Sign Up' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
        </span>
      </div>
    </button>
  </Link>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Agricultural Innovation Platform", "Connecting Farmers to Markets", "Sustainable Farming Solutions", "Digital Agriculture Marketplace"];

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
       
      });
    };

    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-orange-200 overflow-hidden relative" id="Home">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-300/30 to-rose-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-300/30 to-yellow-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-rose-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
      </div>
      
      {/* Floating petals effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-20 animate-bounce`}
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i * 8)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 3)}s`
            }}
          ></div>
        ))}
      </div>

      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto px-[5%] sm:px-6 lg:px-[10%] min-h-screen">
          <div className="flex flex-col items-center justify-center h-screen text-center">
            {/* Main Content */}
            <div className="w-full max-w-4xl space-y-6 sm:space-y-8"
              data-aos="fade-up"
              data-aos-delay="200">
              <div className="space-y-4 sm:space-y-6">
                <StatusBadge />
                <MainTitle />

                {/* Typing Effect */}
                <div className="h-8 flex items-center justify-center" data-aos="fade-up" data-aos-delay="800">
                  <span className="text-xl md:text-2xl bg-gradient-to-r from-pink-700 to-rose-600 bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-pink-500 to-rose-500 ml-1 animate-pulse"></span>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg text-pink-800/80 max-w-2xl mx-auto leading-relaxed font-light"
                  data-aos="fade-up"
                  data-aos-delay="1000">
                  Transforming agriculture through innovative digital solutions that connect farmers directly with buyers, 
                  ensuring fair prices, sustainable practices, and efficient supply chain management.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center" data-aos="fade-up" data-aos-delay="1200">
                  <CTAButton href="/auth/login" text="Sign In" icon={ExternalLink} />
                  <CTAButton href="/auth/signup" text="Sign Up" icon={Mail} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20 px-[5%] sm:px-6 lg:px-[10%]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose 
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent"> AGRI-HOPE</span>
              ?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Empowering farmers and buyers through cutting-edge technology and sustainable agricultural practices
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-pink-200/20 hover:bg-white/20 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 p-3 mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <span className="text-pink-500 font-bold text-xl">🌾</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Direct Farm-to-Market</h3>
              <p className="text-gray-600">Connect farmers directly with buyers, eliminating middlemen and ensuring fair pricing for quality agricultural products.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-pink-200/20 hover:bg-white/20 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="400">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 p-3 mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <span className="text-pink-500 font-bold text-xl">📊</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Real-time Analytics</h3>
              <p className="text-gray-600">Advanced analytics and market insights to help farmers make informed decisions and optimize their crop production.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-pink-200/20 hover:bg-white/20 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="600">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 p-3 mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <span className="text-pink-500 font-bold text-xl">🌱</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Sustainable Practices</h3>
              <p className="text-gray-600">Promoting eco-friendly farming methods and sustainable supply chain solutions for a greener future.</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8" data-aos="fade-up" data-aos-delay="800">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-2">10K+</div>
              <div className="text-gray-600 font-medium">Active Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-2">50K+</div>
              <div className="text-gray-600 font-medium">Products Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-2">200%</div>
              <div className="text-gray-600 font-medium">Growth Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-2">95%</div>
              <div className="text-gray-600 font-medium">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(Home);