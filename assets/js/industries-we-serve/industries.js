/*=====================================*
        INDUSTRIES
*=====================================*/

function initIndustries() {

    console.log("✅ Industries initialized.");

    initIndustriesHero();

    initIndustriesOverview();

    initHospitals();

    initLaboratories();

    initPharmacies();

    initPharmaceuticalCompanies();

    initBloodBanks();

    initMedicalSuppliers();

}


/*=====================================*
        INDUSTRIES HERO
*=====================================*/

function initIndustriesHero() {

    const hero =
        document.querySelector(
            ".industries-hero"
        );


    if (!hero) {

        return;

    }


    hero.classList.add(
        "loaded"
    );

}


/*=====================================*
        INDUSTRIES OVERVIEW
*=====================================*/

function initIndustriesOverview() {

    const overview =
        document.querySelector(
            ".industries-overview"
        );


    if (!overview) {

        return;

    }


    overview.classList.add(
        "loaded"
    );

}


/*=====================================*
        HOSPITALS
*=====================================*/

function initHospitals() {

    const cards =
        document.querySelectorAll(
            ".hospital-card"
        );


    if (!cards.length) {

        return;

    }


    cards.forEach(
        function (card) {

            card.classList.add(
                "loaded"
            );

        }
    );

}


/*=====================================*
        LABORATORIES
*=====================================*/

function initLaboratories() {

    const cards =
        document.querySelectorAll(
            ".laboratory-card"
        );


    if (!cards.length) {

        return;

    }


    cards.forEach(
        function (card) {

            card.classList.add(
                "loaded"
            );

        }
    );

}


/*=====================================*
        PHARMACIES
*=====================================*/

function initPharmacies() {

    const cards =
        document.querySelectorAll(
            ".pharmacy-card"
        );


    if (!cards.length) {

        return;

    }


    cards.forEach(
        function (card) {

            card.classList.add(
                "loaded"
            );

        }
    );

}


/*=====================================*
        PHARMACEUTICAL COMPANIES
*=====================================*/

function initPharmaceuticalCompanies() {

    const cards =
        document.querySelectorAll(
            ".pharmaceutical-card"
        );


    if (!cards.length) {

        return;

    }


    cards.forEach(
        function (card) {

            card.classList.add(
                "loaded"
            );

        }
    );

}


/*=====================================*
        BLOOD BANKS
*=====================================*/

function initBloodBanks() {

    const cards =
        document.querySelectorAll(
            ".blood-bank-card"
        );


    if (!cards.length) {

        return;

    }


    cards.forEach(
        function (card) {

            card.classList.add(
                "loaded"
            );

        }
    );

}


/*=====================================*
        MEDICAL SUPPLIERS
*=====================================*/

function initMedicalSuppliers() {

    const cards =
        document.querySelectorAll(
            ".medical-supplier-card"
        );


    if (!cards.length) {

        return;

    }


    cards.forEach(
        function (card) {

            card.classList.add(
                "loaded"
            );

        }
    );

}


/*=====================================*
        EXPORT
*=====================================*/

window.initIndustries =
    initIndustries;


window.initIndustriesHero =
    initIndustriesHero;


window.initIndustriesOverview =
    initIndustriesOverview;


window.initHospitals =
    initHospitals;


window.initLaboratories =
    initLaboratories;


window.initPharmacies =
    initPharmacies;


window.initPharmaceuticalCompanies =
    initPharmaceuticalCompanies;


window.initBloodBanks =
    initBloodBanks;


window.initMedicalSuppliers =
    initMedicalSuppliers;


console.log(
    "✅ Industries JS loaded"
);