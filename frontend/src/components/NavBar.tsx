import { Routes, Route, Link } from 'react-router-dom';
import { PetsList } from './pets/PetsList.tsx';
import { CreatePetForm } from './pets/PetInsert.tsx';
import { Home } from '../pages/Home.tsx';
import {useState} from "react";


function Nav() {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
            <>
                <header className="absolute inset-x-0 top-0 z-50">
                    <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                        <div className="flex lg:flex-1">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">PetPro</span>
                                <img src="/Paw_Print.svg" alt="Paw print logo" className="h-8 w-auto"/>
                            </a>
                        </div>
                        <div className="flex lg:hidden">
                            <button type="button"
                                    onClick={() => setMenuOpen(true)}
                                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                                <span className="sr-only">Open main menu</span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                     data-slot="icon" aria-hidden="true" className="size-6">
                                    <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round"
                                          strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="hidden lg:flex lg:gap-x-12">
                            <Link to="/" className="text-sm/6 font-semibold text-gray-900">Home</Link>
                            <Link to="/pets" className="text-sm/6 font-semibold text-gray-900">Pets</Link>
                            <Link to="/insert" className="text-sm/6 font-semibold text-gray-900">Create Pets</Link>
                        </div>
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <a href="#" className="text-sm/6 font-semibold text-gray-900">Log in <span
                                    aria-hidden="true">&rarr;</span></a>
                        </div>
                    </nav>
                    {menuOpen && (
                    <div role="dialog" aria-modal="true" className="lg:hidden">
                        <div className="fixed inset-0 z-50"></div>
                        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <a href="#" className="-m-1.5 p-1.5">
                                    <span className="sr-only">Your Company</span>
                                    <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                         alt="" className="h-8 w-auto"/>
                                </a>
                                <button type="button"
                                        onClick={() => setMenuOpen(false)}
                                        className="-m-2.5 rounded-md p-2.5 text-gray-700">
                                    <span className="sr-only">Close menu</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                         data-slot="icon" aria-hidden="true" className="size-6">
                                        <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        <Link to='/'
                                              onClick={() => setMenuOpen(false)}
                                              className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Home</Link>
                                        <Link to="/pets"
                                              onClick={() => setMenuOpen(false)}
                                              className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Pets</Link>
                                        <Link to="/insert"
                                              onClick={() => setMenuOpen(false)}
                                              className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Create
                                            Pet</Link>
                                    </div>
                                    <div className="py-6">
                                        <a href="#"
                                           className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log
                                            in</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </header>
                <div aria-hidden="true"
                     className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                    <div style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}
                         className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"></div>
                </div>

                <main>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/pets" element={<PetsList/>}/>
                        <Route path="/insert" element={<CreatePetForm/>}/>
                        <Route path="*" element={<h2>Page Not Found</h2>}/>
                    </Routes>
                </main>
            </>
    )
            ;
}

export default Nav;
