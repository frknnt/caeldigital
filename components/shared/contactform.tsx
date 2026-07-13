          
          import { Mail, Headset, Paperclip } from "lucide-react";<div className="w-full lg:w-7/12">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white">
              
              <h3 className="text-3xl font-bold text-gray-900 mb-10 tracking-tight">
                Fill this form below
              </h3>
              
              <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
                
                {/* İsim Input */}
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your full name" 
                    className="w-full bg-transparent border-0 border-b border-gray-200 pb-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:border-[#00BFFF] transition-colors outline-none" 
                    required 
                  />
                </div>

                {/* Telefon Input (Orijinal HTML'de placeholder "Enter the e-mail" olarak unutulmuş, onu düzelttim) */}
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2">Your Phone</label>
                  <input 
                    type="tel" 
                    placeholder="Enter your phone number" 
                    className="w-full bg-transparent border-0 border-b border-gray-200 pb-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:border-[#00BFFF] transition-colors outline-none" 
                    required 
                  />
                </div>

                {/* Proje Detayı Textarea */}
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2">More About The Project</label>
                  <textarea 
                    rows={1}
                    placeholder="" 
                    className="w-full bg-transparent border-0 border-b border-gray-200 pb-8 text-gray-900 focus:ring-0 focus:border-[#00BFFF] transition-colors outline-none resize-none"
                  ></textarea>
                </div>

                {/* Dosya Eki (Attachment) */}
                <div className="flex items-center gap-3 cursor-pointer group mt-2 w-max">
                  <Paperclip className="w-5 h-5 text-gray-500 group-hover:text-[#00BFFF] transition-colors" />
                  <span className="text-sm font-bold text-gray-800 group-hover:text-[#00BFFF] transition-colors">Add an Attachment</span>
                </div>

                {/* Submit Butonu (Koyu Temalı 3D Hap Buton) */}
                <button 
                  type="submit" 
                  className="w-full py-4 mt-4 bg-gradient-to-b from-[#333333] to-[#1a1a1a] border border-[#444] text-white font-semibold rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
                >
                  Submit Message
                </button>

              </form>
            </div>
          </div>