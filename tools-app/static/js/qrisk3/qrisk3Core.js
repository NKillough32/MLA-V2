/**
 * QRISK3-2017 Core Calculator
 * Based on sisuhealthgroup/qrisk3 implementation
 * 
 * Copyright 2017 ClinRisk Ltd.
 * Licensed under GNU LGPL v3
 */

const Disclaimer = `  
    The initial version of this file, to be found at http://svn.clinrisk.co.uk/opensource/qrisk2, faithfully implements QRISK3-2017.
    ClinRisk Ltd. have released this code under the GNU Lesser General Public License to enable others to implement the algorithm faithfully.
    However, the nature of the GNU Lesser General Public License is such that we cannot prevent, for example, someone accidentally 
    altering the coefficients, getting the inputs wrong, or just poor programming.
    ClinRisk Ltd. stress, therefore, that it is the responsibility of the end user to check that the source that they receive produces the same 
    results as the original code found at https://qrisk.org.
    Inaccurate implementations of risk scores can lead to wrong patients being given the wrong treatment. 
`;

// Helper to convert boolean to int
const boolToInt = (value) => (value ? 1 : 0);

/**
 * Build QRISK3 input object
 * @param {Object} aboutYou - age, sex, ethnicity
 * @param {Object} clinical - medical conditions
 * @param {Object} biometric - measurements
 * @param {number} townsendScore - deprivation score
 */
const buildQriskInput = (aboutYou, clinical, biometric, townsendScore = 0) => {
    return {
        sex: aboutYou.sex,
        age: aboutYou.age,
        atrialFibrillation: boolToInt(clinical.atrialFibrillation),
        onAtypicalAntipsychoticsMedication: boolToInt(clinical.onAtypicalAntipsychoticsMedication),
        onRegularSteroidTablets: boolToInt(clinical.onRegularSteroidTablets),
        diagnosisOrTreatmentOfErectileDisfunction: boolToInt(clinical.diagnosisOrTreatmentOfErectileDisfunction),
        migraine: boolToInt(clinical.migraine),
        rheumatoidArthritis: boolToInt(clinical.rheumatoidArthritis),
        chronicKidneyDiseaseStage345: boolToInt(clinical.chronicKidneyDiseaseStage345),
        severeMentalIllness: boolToInt(clinical.severeMentalIllness),
        systemicLupusErythematosus: boolToInt(clinical.systemicLupusErythematosus),
        bloodPressureTreatment: boolToInt(clinical.bloodPressureTreatment),
        diabetesType1: boolToInt(clinical.diabetesType1),
        diabetesType2: boolToInt(clinical.diabetesType2),
        bmi: biometric.bmi,
        ethnicity: aboutYou.ethnicity,
        familyAnginaOrHeartAttack: boolToInt(clinical.familyAnginaOrHeartAttack),
        cholesterolHdlRatio: biometric.cholesterolHdlRatio,
        systolicBloodPressure: biometric.systolicBloodPressure,
        systolicStandardDeviation: biometric.systolicStandardDeviation,
        smokerStatus: clinical.smokerStatus,
        survivorSpan: 10, // QRISK3 is 10-year risk
        townsendScore: townsendScore
    };
};

/**
 * Build "About You" section
 */
const buildAboutYou = (age, sex, ethnicity) => {
    return { age, sex, ethnicity };
};

/**
 * Build Clinical section
 */
const buildClinical = (
    smokerStatus,
    diabetesStatus,
    familyAnginaOrHeartAttack,
    chronicKidneyDiseaseStage345,
    atrialFibrillation,
    bloodPressureTreatment,
    migraine,
    rheumatoidArthritis,
    systemicLupusErythematosus,
    severeMentalIllness,
    onAtypicalAntipsychoticsMedication,
    onRegularSteroidTablets,
    diagnosisOrTreatmentOfErectileDisfunction = false
) => {
    return {
        smokerStatus,
        diabetesType1: diabetesStatus === 'type1',
        diabetesType2: diabetesStatus === 'type2',
        familyAnginaOrHeartAttack,
        chronicKidneyDiseaseStage345,
        atrialFibrillation,
        bloodPressureTreatment,
        migraine,
        rheumatoidArthritis,
        systemicLupusErythematosus,
        severeMentalIllness,
        onAtypicalAntipsychoticsMedication,
        onRegularSteroidTablets,
        diagnosisOrTreatmentOfErectileDisfunction
    };
};

/**
 * Build Biometric section
 */
const buildBiometrics = (cholesterolHdlRatio, systolicBloodPressure, systolicStandardDeviation, bmi) => {
    return {
        cholesterolHdlRatio,
        systolicBloodPressure,
        systolicStandardDeviation,
        bmi
    };
};

/**
 * Calculate QRISK3 score
 * @param {Object} qriskInput - Complete QRISK input object
 * @returns {number} - 10-year CVD risk percentage
 */
const calculateScore = (qriskInput) => {
    if (!qriskInput) {
        throw new Error('qriskInput is required');
    }

    const sex = qriskInput.sex;
    let score = -1;

    switch (sex) {
        case 'male':
            if (!window.qrisk3Male || typeof window.qrisk3Male.calc !== 'function') {
                throw new Error('QRISK3 male calculation module not loaded');
            }
            score = window.qrisk3Male.calc(
                qriskInput.age,
                qriskInput.atrialFibrillation,
                qriskInput.onAtypicalAntipsychoticsMedication,
                qriskInput.onRegularSteroidTablets,
                qriskInput.diagnosisOrTreatmentOfErectileDisfunction,
                qriskInput.migraine,
                qriskInput.rheumatoidArthritis,
                qriskInput.chronicKidneyDiseaseStage345,
                qriskInput.severeMentalIllness,
                qriskInput.systemicLupusErythematosus,
                qriskInput.bloodPressureTreatment,
                qriskInput.diabetesType1,
                qriskInput.diabetesType2,
                qriskInput.bmi,
                qriskInput.ethnicity,
                qriskInput.familyAnginaOrHeartAttack,
                qriskInput.cholesterolHdlRatio,
                qriskInput.systolicBloodPressure,
                qriskInput.systolicStandardDeviation,
                qriskInput.smokerStatus,
                qriskInput.survivorSpan,
                qriskInput.townsendScore
            );
            break;
        case 'female':
            if (!window.qrisk3Female || typeof window.qrisk3Female.calc !== 'function') {
                throw new Error('QRISK3 female calculation module not loaded');
            }
            score = window.qrisk3Female.calc(
                qriskInput.age,
                qriskInput.atrialFibrillation,
                qriskInput.onAtypicalAntipsychoticsMedication,
                qriskInput.onRegularSteroidTablets,
                qriskInput.migraine,
                qriskInput.rheumatoidArthritis,
                qriskInput.chronicKidneyDiseaseStage345,
                qriskInput.severeMentalIllness,
                qriskInput.systemicLupusErythematosus,
                qriskInput.bloodPressureTreatment,
                qriskInput.diabetesType1,
                qriskInput.diabetesType2,
                qriskInput.bmi,
                qriskInput.ethnicity,
                qriskInput.familyAnginaOrHeartAttack,
                qriskInput.cholesterolHdlRatio,
                qriskInput.systolicBloodPressure,
                qriskInput.systolicStandardDeviation,
                qriskInput.smokerStatus,
                qriskInput.survivorSpan,
                qriskInput.townsendScore
            );
            break;
        default:
            throw new Error('Invalid sex. It should be either "male" or "female"');
    }

    return score;
};

// Input builder helper object
const inputBuilder = {
    buildQriskInput,
    buildAboutYou,
    buildClinical,
    buildBiometrics,
    Sex: {
        male: 'male',
        female: 'female'
    },
    Ethnicity: {
        white: 1,
        indian: 2,
        pakistani: 3,
        bangladeshi: 4,
        otherAsian: 5,
        caribbean: 6,
        blackAfrican: 7,
        chinese: 8,
        other: 9
    },
    DiabetesStatus: {
        none: 'none',
        type1: 'type1',
        type2: 'type2'
    },
    SmokingStatus: {
        nonSmoker: 0,
        exSmoker: 1,
        lightSmoker: 2,
        moderateSmoker: 3,
        heavySmoker: 4
    }
};

// Expose to window for use in calculators
window.qrisk3Official = {
    calculateScore,
    inputBuilder,
    Disclaimer
};

console.log('✅ QRISK3 Official library loaded successfully');
