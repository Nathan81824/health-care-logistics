/*====================================
            BASE PATH
=====================================*/

const basePath =
    window.location.pathname.toLowerCase().includes("/pages/")
        ? "../"
        : "";



/*====================================
            LOAD SECTION
=====================================*/

function loadSection(file, containerId, callback = null){


    const container = document.getElementById(containerId);


    if(!container) return;



    fetch(file)

    .then(response=>{


        if(!response.ok){

            throw new Error(
                `Failed to load ${file}`
            );

        }


        return response.text();


    })


    .then(html=>{


        container.innerHTML = html;



        if(typeof callback === "function"){

            callback();

        }



        /*
            Refresh animations
            because new HTML was added
        */

        if(typeof initScrollReveal === "function"){

            initScrollReveal();

        }



    })


    .catch(error=>{

        console.error(error);

    });


}






/*====================================
            PAGE LOAD
=====================================*/


document.addEventListener("DOMContentLoaded",()=>{



/*================================
            AUTH PAGE
================================*/

loadSection(
    `${basePath}components/auth/auth.html`,
    "auth-container",
    () => {

        if (typeof initAuth === "function") {

            initAuth();

        }

    }
);

/*====================================
            NAVBAR
=====================================*/


loadSection(

`${basePath}components/shared/navbar.html`,

"navbar-container",

()=>{


if(typeof initNavbar==="function"){

    initNavbar();

}


}

);







/*====================================
            HOME PAGE
=====================================*/



loadSection(

`${basePath}components/home/hero.html`,

"hero-container",

()=>{


if(typeof initHero==="function"){

    initHero();

}


}

);





loadSection(

`${basePath}components/home/services.html`,

"services-container",

()=>{


if(typeof initHomeServices==="function"){

    initHomeServices();

}


}

);






loadSection(

`${basePath}components/home/why-choose-us.html`,

"why-choose-us-container",

()=>{


if(typeof initWhyChooseUs==="function"){

    initWhyChooseUs();

}


}

);







loadSection(

`${basePath}components/home/how-it-works.html`,

"how-it-works-container",

()=>{


if(typeof initHowItWorks==="function"){

    initHowItWorks();

}


}

);







loadSection(

`${basePath}components/home/operations.html`,

"operations-container",

()=>{


if(typeof initOperations==="function"){

    initOperations();

}


}

);







loadSection(

`${basePath}components/home/industries.html`,

"industries-container",

()=>{


if(typeof initIndustries==="function"){

    initIndustries();

}


}

);







loadSection(

`${basePath}components/home/testimonials.html`,

"testimonials-container",

()=>{


if(typeof initTestimonials==="function"){

    initTestimonials();

}


}

);







loadSection(
`${basePath}components/home/cta.html`,
"cta-container",
()=>{

    if(typeof initCTA === "function"){

        initCTA();

    }

}
);








/*====================================
            ABOUT PAGE
=====================================*/



loadSection(

`${basePath}components/about/hero.html`,

"about-hero-container",

()=>{


if(typeof initAboutHero==="function"){

initAboutHero();

}


}

);





loadSection(

`${basePath}components/about/our-story.html`,

"about-our-story-container",

()=>{


if(typeof initOurStory==="function"){

initOurStory();

}


}

);





loadSection(

`${basePath}components/about/vision.html`,

"about-vision-container",

()=>{


if(typeof initVision==="function"){

initVision();

}


}

);





loadSection(

`${basePath}components/about/stats.html`,

"about-stats-container",

()=>{


if(typeof initStats==="function"){

initStats();

}


}

);





loadSection(

`${basePath}components/about/values.html`,

"about-values-container",

()=>{


if(typeof initValues==="function"){

initValues();

}


}

);





loadSection(

`${basePath}components/about/team.html`,

"about-team-container",

()=>{


if(typeof initTeam==="function"){

initTeam();

}


}

);








/*====================================
            SERVICES PAGE
=====================================*/


loadSection(

`${basePath}components/services/hero.html`,

"services-hero-container",

()=>{


if(typeof initServicesHero==="function"){

initServicesHero();

}


}

);




loadSection(

`${basePath}components/services/overview.html`,

"overview-container",

()=>{


if(typeof initOverview==="function"){

initOverview();

}


}

);





loadSection(

`${basePath}components/services/core-services.html`,

"core-services-container",

()=>{


if(typeof initCoreServices==="function"){

initCoreServices();

}


}

);






loadSection(

`${basePath}components/services/process.html`,

"process-container",

()=>{


if(typeof initProcess==="function"){

initProcess();

}


}

);






loadSection(

`${basePath}components/services/faq.html`,

"faq-container",

()=>{


if(typeof initFAQ==="function"){

initFAQ();

}


}

);

/*====================================
        INDUSTRIES PAGE
=====================================*/

loadSection(
`${basePath}components/industries-we-serve/hero.html`,
"industries-hero-container",
()=>{
    if(typeof initIndustriesHero==="function"){
        initIndustriesHero();
    }
}
);

loadSection(
`${basePath}components/industries-we-serve/industries-overview.html`,
"industries-overview-container",
()=>{
    if(typeof initIndustriesOverview==="function"){
        initIndustriesOverview();
    }
}
);

loadSection(
`${basePath}components/industries-we-serve/hospital.html`,
"hospital-container",
()=>{
    if(typeof initHospital==="function"){
        initHospital();
    }
}
);

loadSection(
`${basePath}components/industries-we-serve/labotories.html`,
"labotories-container",
()=>{
    if(typeof initLabotories==="function"){
        initLabotories();
    }
}
);

loadSection(
`${basePath}components/industries-we-serve/pharmacies.html`,
"pharmacies-container",
()=>{
    if(typeof initPharmacies==="function"){
        initPharmacies();
    }
}
);

loadSection(
`${basePath}components/industries-we-serve/pharmaceutical-companies.html`,
"pharmaceutical-companies-container",
()=>{
    if(typeof initPharmaceuticalCompanies==="function"){
        initPharmaceuticalCompanies();
    }
}
);

loadSection(
`${basePath}components/industries-we-serve/blood-bank.html`,
"blood-bank-container",
()=>{
    if(typeof initBloodBank==="function"){
        initBloodBank();
    }
}
);

loadSection(
`${basePath}components/industries-we-serve/medical-suppliers.html`,
"medical-suppliers-container",
()=>{
    if(typeof initMedicalSuppliers==="function"){
        initMedicalSuppliers();
    }
}
);

/*====================================
            FOOTER
=====================================*/


loadSection(

`${basePath}components/shared/footer.html`,

"footer-container",

()=>{


if(typeof initFooter==="function"){

initFooter();

}


}

);







/*====================================
            WHATSAPP
=====================================*/


loadSection(

`${basePath}components/shared/whatsapp-button.html`,

"whatsapp-container",

()=>{


if(typeof initWhatsAppWidget==="function"){

initWhatsAppWidget();

}


}

);






/*====================================
        FINAL SCROLL CHECK
=====================================*/


setTimeout(()=>{


if(typeof initScrollReveal==="function"){

    initScrollReveal();

}


},1500);



});