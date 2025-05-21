import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Users, Lock, MessageSquare, CheckCircle, Coffee } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-slate-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About BlogifyHub</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            We're building the best platform for writers and readers to connect, share ideas, and grow together.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
              BlogifyHub was born out of a simple observation: while social media made sharing easier than ever, 
              thoughtful, long-form content was getting lost in the noise. We wanted to create a space where 
              quality writing could thrive and meaningful connections could form around ideas.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
              Founded in 2024, our platform has quickly grown into a vibrant community of writers and readers 
              from diverse backgrounds, all united by a love for great content and engaging discussions.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Today, BlogifyHub is home to thousands of writers covering everything from technology and business 
              to travel and personal development. Our mission remains the same: to empower voices, spread valuable 
              knowledge, and build connections that last.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm text-center">
              <div className="bg-teal-100 dark:bg-teal-800/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality Content</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We believe in substance over noise. Our platform is designed to promote thoughtful, 
                well-crafted content that provides real value to readers.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm text-center">
              <div className="bg-slate-100 dark:bg-slate-800/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-slate-600 dark:text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Inclusive Community</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We're committed to creating a space where diverse voices can thrive and 
                everyone feels welcome to contribute their unique perspectives.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm text-center">
              <div className="bg-amber-100 dark:bg-amber-800/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Creator-First Approach</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We put creators first by giving them control over their content, transparent 
                policies, and tools to build their audience and monetize their work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                name: 'Alex Morgan',
                role: 'Founder & CEO',
                bio: 'Former editor with a passion for creating platforms that empower writers.',
                avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
              },
              {
                name: 'Sophia Chen',
                role: 'Chief Technology Officer',
                bio: 'Tech enthusiast focused on building intuitive and powerful publishing tools.',
                avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
              },
              {
                name: 'Marcus Wilson',
                role: 'Head of Community',
                bio: 'Community builder dedicated to fostering meaningful connections among users.',
                avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
              },
              {
                name: 'Layla Patel',
                role: 'Creative Director',
                bio: 'Designer with an eye for creating beautiful, functional user experiences.',
                avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
              },
            ].map((member, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm text-center">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-teal-600 dark:text-teal-400 mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-slate-700 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <p className="text-slate-300">Active Writers</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">250K+</div>
              <p className="text-slate-300">Monthly Readers</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100K+</div>
              <p className="text-slate-300">Articles Published</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <p className="text-slate-300">Countries Represented</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose BlogifyHub</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <CheckCircle className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Easy-to-Use Platform</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our intuitive editor and dashboard make publishing and managing content a breeze, 
                  allowing writers to focus on what they do best: creating great content.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <CheckCircle className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Engaged Audience</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Connect with readers who genuinely care about quality content. Our community values 
                  thoughtful discussion and meaningful engagement.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <CheckCircle className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Growth Tools</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  From SEO optimization to social sharing features, we provide all the tools you need 
                  to grow your audience and reach more readers.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <CheckCircle className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Monetization Options</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Multiple ways to earn from your content, including our Partner Program, 
                  tips from readers, and sponsored content opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: "BlogifyHub completely transformed my writing career. The supportive community and powerful tools have helped me build an audience I never thought possible.",
                author: "Rebecca Taylor",
                role: "Travel Blogger",
                avatar: "https://randomuser.me/api/portraits/women/63.jpg",
              },
              {
                quote: "As a reader, I love how easy it is to discover quality content on topics I care about. The discussion features make it feel like a real community.",
                author: "David Chen",
                role: "Avid Reader",
                avatar: "https://randomuser.me/api/portraits/men/52.jpg",
              },
              {
                quote: "I've tried many blogging platforms over the years, but BlogifyHub offers the perfect balance of simplicity and powerful features. It's now my permanent home online.",
                author: "Michael Rodriguez",
                role: "Tech Writer",
                avatar: "https://randomuser.me/api/portraits/men/67.jpg",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.author}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community Today</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Whether you're a writer looking to share your voice or a reader searching for great content, 
            BlogifyHub is the platform for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="btn bg-white text-teal-700 hover:bg-gray-100 px-8 py-3 text-lg">
              Get Started
            </Link>
            <Link to="/blog" className="btn bg-transparent border border-white hover:bg-teal-700 px-8 py-3 text-lg">
              Explore Content
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <p className="flex items-start">
                    <MessageSquare className="w-5 h-5 text-teal-600 dark:text-teal-400 mr-3 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">
                      contact@blogifyhub.com
                    </span>
                  </p>
                  <p className="flex items-start">
                    <Coffee className="w-5 h-5 text-teal-600 dark:text-teal-400 mr-3 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">
                      123 Create Street<br />
                      San Francisco, CA 94103<br />
                      United States
                    </span>
                  </p>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="label">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="input" 
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="label">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="input" 
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="label">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="input" 
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="label">Message</label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      className="input" 
                      placeholder="Your message here..."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;