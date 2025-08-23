import React from 'react';

const HeroSection = () => {
    return (
        <section className="gradient-bg text-white py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Participa y gana increíbles premios</h2>
                        <p className="text-xl mb-6">La plataforma más fácil y segura para participar en rifas online en Venezuela.</p>
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                            <a href="#rifas"
                                className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold text-center hover:bg-indigo-50 transition">
                                Ver Rifas Disponibles
                            </a>
                            <a href="#reglas"
                                className="bg-indigo-700 text-white px-6 py-3 rounded-lg font-bold text-center hover:bg-indigo-600 transition">
                                Cómo Participar
                            </a>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <div className="relative">
                            <div className="w-64 h-64 md:w-80 md:h-80 bg-indigo-400 rounded-full opacity-20 absolute -top-10 -left-10"></div>
                            <div className="w-64 h-64 md:w-80 md:h-80 bg-indigo-300 rounded-full opacity-20 absolute -bottom-10 -right-10"></div>
                            <img src="public/img/img1.png"
                                alt="Premios de rifas"
                                className="relative z-10 w-67 h-64 md:w-85 md:h-80 object-cover rounded-xl shadow-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;