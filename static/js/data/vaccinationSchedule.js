// UK National Vaccination Programme (England) snapshot
// Structured data to power the Vaccinations tab in the medical tools panel

window.ukVaccinationProgramme = {
    updated: 'April 2024 (England schedule)',
    keyPoints: [
        'Always cross-check eligibility and product updates in the Immunisation “Green Book” and local NHS pathways.',
        'Document maternal screening, risk factors, and consent clearly to support selective programmes (e.g. hepatitis B, BCG).',
        'Live vaccines (MMR, rotavirus, LAIV, varicella) are contraindicated in profoundly immunosuppressed patients—seek specialist advice.',
        'Post-vaccination paracetamol is advised routinely after infant MenB doses to reduce fever risk.'
    ],
    routineChildhood: [
        {
            age: 'Pregnancy (16–32 weeks gestation)',
            vaccines: [
                {
                    name: 'Pertussis (Tdap/IPV – Boostrix-IPV)',
                    summary: 'Offer in every pregnancy, ideally 16–32 weeks, to optimise passive antibody transfer and protect the newborn.',
                    notes: 'Can be given up to delivery; administer with influenza vaccine if due.'
                },
                {
                    name: 'Seasonal inactivated influenza',
                    summary: 'Offer during autumn/winter campaign regardless of gestation to reduce maternal and neonatal complications.'
                },
                {
                    name: 'COVID-19 seasonal booster',
                    summary: 'Give during the national campaign when eligible to maintain maternal protection.'
                }
            ],
            notes: 'Assess eligibility for RSV vaccine when programmes are in place (typically from September).' 
        },
        {
            age: 'At birth (selective programmes)',
            vaccines: [
                {
                    name: 'BCG',
                    summary: 'For infants at higher risk of tuberculosis (household/parental exposure or high-incidence areas).'
                },
                {
                    name: 'Hepatitis B (monovalent)',
                    summary: 'For babies of hepatitis B surface antigen positive mothers or other high-risk exposures.',
                    notes: 'Schedule 0, 4, 8, 12 weeks plus 12-month booster with post-vaccination serology.'
                }
            ],
            notes: 'Record maternal screening status and arrange community follow-up for completion of selective schedules.'
        },
        {
            age: '8 weeks',
            vaccines: [
                {
                    name: '6-in-1 (DTaP/IPV/Hib/HepB)',
                    summary: 'First dose of the primary series (Infanrix hexa or Vaxelis).'
                },
                {
                    name: 'Rotavirus (Rotarix)',
                    summary: 'Oral live vaccine against severe rotavirus gastroenteritis.',
                    notes: 'Must be started before 15 weeks 0 days.'
                },
                {
                    name: 'MenB (Bexsero)',
                    summary: 'First dose—give paracetamol prophylaxis due to post-dose fever risk.'
                },
                {
                    name: 'Pneumococcal (PCV13/PCV15)',
                    summary: 'Priming dose as part of the infant 1+1 schedule (some areas give at 12 weeks—follow local guidance).'
                }
            ],
            notes: 'Check contraindications to live oral rotavirus (e.g. SCID, history of intussusception).'
        },
        {
            age: '12 weeks',
            vaccines: [
                {
                    name: '6-in-1 (DTaP/IPV/Hib/HepB)',
                    summary: 'Second dose of the primary course (minimum 4-week interval).'
                },
                {
                    name: 'Rotavirus (Rotarix)',
                    summary: 'Second and final oral dose.',
                    notes: 'Do not initiate course after 15 weeks; final dose must be given by 24 weeks.'
                },
                {
                    name: 'Pneumococcal (PCV)',
                    summary: 'Give the priming dose here in regions following the 1+1 schedule if not administered at 8 weeks.'
                }
            ],
            notes: 'Ensure infants on selective hepatitis B programmes receive the monovalent dose at 8 weeks.'
        },
        {
            age: '16 weeks',
            vaccines: [
                {
                    name: '6-in-1 (DTaP/IPV/Hib/HepB)',
                    summary: 'Third dose completing the primary infant course.'
                },
                {
                    name: 'MenB (Bexsero)',
                    summary: 'Second infant dose with prophylactic paracetamol advised.'
                },
                {
                    name: 'Pneumococcal (PCV)',
                    summary: 'Second dose where regions continue to use a 2+1 schedule—check local pathway.'
                }
            ],
            notes: 'Consider accelerated hepatitis B schedules for high-risk infants as per specialist advice.'
        },
        {
            age: '12–13 months',
            vaccines: [
                {
                    name: 'MMR (first dose)',
                    summary: 'Live attenuated protection against measles, mumps, rubella.'
                },
                {
                    name: 'Hib/MenC booster (Menitorix)',
                    summary: 'Boosts immunity against Haemophilus influenzae type b and meningococcal C.'
                },
                {
                    name: 'Pneumococcal (PCV) booster',
                    summary: 'Final infant dose of PCV13/15.'
                },
                {
                    name: 'MenB booster',
                    summary: 'Booster dose—advise parents to continue paracetamol if fever develops.'
                }
            ],
            notes: 'Ensure minimum 4-week interval from any additional MenB catch-up doses.'
        },
        {
            age: '2–3 years (each autumn)',
            vaccines: [
                {
                    name: 'Live attenuated influenza (LAIV)',
                    summary: 'Nasal spray programme for children aged 2 and 3 on 31 August each year.',
                    notes: 'Offer quadrivalent inactivated influenza vaccine if LAIV contraindicated.'
                }
            ],
            notes: 'School-aged children up to year 11 receive LAIV through the school immunisation service.'
        },
        {
            age: '3 years 4 months (pre-school booster)',
            vaccines: [
                {
                    name: '4-in-1 (DTaP/IPV)',
                    summary: 'Booster for diphtheria, tetanus, pertussis, and polio prior to school entry.'
                },
                {
                    name: 'MMR (second dose)',
                    summary: 'Provides long-term protection—ensure minimum 3-month interval from first dose.'
                }
            ],
            notes: 'Check for outstanding MenB or PCV doses before school entry.'
        },
        {
            age: '12–13 years (school year 8/9)',
            vaccines: [
                {
                    name: 'HPV (Gardasil 9)',
                    summary: 'Two-dose schedule (0 and 6–24 months) for all adolescents to protect against HPV-related cancers.',
                    notes: 'Immunocompromised young people require a 3-dose schedule at 0, 1, 6 months.'
                }
            ],
            notes: 'Offer catch-up up to age 25 through GP or sexual health services.'
        },
        {
            age: '14 years (school year 9/10)',
            vaccines: [
                {
                    name: '3-in-1 teenage booster (Td/IPV)',
                    summary: 'Boosts tetanus, diphtheria, and polio immunity.'
                },
                {
                    name: 'MenACWY',
                    summary: 'Single conjugate vaccine protecting against meningococcal groups A, C, W, and Y.'
                }
            ],
            notes: 'Provide catch-up for new university entrants (particularly those in student accommodation) up to age 25.'
        }
    ],
    adolescentAdult: [
        {
            group: 'Pregnant people',
            details: [
                'Pertussis (Boostrix-IPV) in every pregnancy, ideally at 16–32 weeks.',
                'Seasonal inactivated influenza vaccine at the earliest opportunity each autumn/winter.',
                'COVID-19 booster when eligible during seasonal campaigns.'
            ]
        },
        {
            group: 'Adults 18–64 years',
            details: [
                'Check measles/mumps/rubella status—offer two doses of MMR if incomplete or uncertain.',
                'Annual influenza vaccine for clinical risk groups (e.g. chronic heart, lung, renal, liver disease, diabetes).',
                'COVID-19 booster for designated cohorts (e.g. health & social care staff, carers, clinical risk groups).'
            ]
        },
        {
            group: 'Aged 65 years',
            details: [
                'Single dose pneumococcal polysaccharide vaccine (PPV23).',
                'Annual influenza vaccine (adjuvanted or high-dose formulations preferred).'
            ]
        },
        {
            group: 'Aged 70–79 years',
            details: [
                'Two-dose recombinant shingles vaccine (Shingrix) with 6–12 month interval.',
                'Offer catch-up up to age 79 if not previously vaccinated.'
            ]
        },
        {
            group: 'Aged 75 years and over',
            details: [
                'Eligible for RSV vaccine during time-limited programmes (September start).',
                'COVID-19 and influenza boosters offered each autumn—consider spring booster for the most vulnerable.'
            ]
        }
    ],
    riskGroups: [
        {
            group: 'Asplenia or splenic dysfunction',
            recommendations: [
                'Lifelong MenACWY booster every 5 years plus MenB two-dose primary course with boosters as advised.',
                'Annual influenza vaccine and prompt pneumococcal vaccination (PCV followed by PPV with 5-yearly boosters).',
                'Offer prophylactic antibiotics and educate about urgent management of febrile illness.'
            ]
        },
        {
            group: 'Immunocompromised (chemotherapy, high-dose steroids, HIV, post-transplant)',
            recommendations: [
                'Avoid live vaccines when severely immunosuppressed—seek specialist input before MMR, LAIV, varicella, and zoster.',
                'Offer inactivated influenza annually, consider additional COVID-19 and pneumococcal boosters.',
                'Assess need for varicella or recombinant zoster vaccines once immune reconstitution achieved.'
            ]
        },
        {
            group: 'Chronic kidney or liver disease',
            recommendations: [
                'Use accelerated hepatitis B schedules with post-immunisation serology to confirm response.',
                'Annual influenza plus pneumococcal PPV boosters every 5 years.',
                'Consider hepatitis A vaccination for chronic liver disease depending on exposure risk.'
            ]
        },
        {
            group: 'Healthcare and laboratory staff',
            recommendations: [
                'Ensure a complete hepatitis B course with documented surface antibody response; offer additional doses if non-responder.',
                'MMR (two doses) and varicella immunity check prior to patient contact roles.',
                'Annual influenza and COVID-19 boosters according to national staff programmes.'
            ]
        }
    ],
    seasonalCampaigns: [
        {
            season: 'Autumn/Winter influenza',
            detail: 'Offer to all aged ≥65 years, clinical risk groups from 6 months, pregnant people, carers, frontline health & social care staff, and all children aged 2–16 years (delivered via GP and school teams).'
        },
        {
            season: 'COVID-19 booster (seasonal)',
            detail: 'Eligible groups typically include adults ≥65 years, care home residents, clinical risk groups aged 6 months and over, pregnant people, unpaid carers, and frontline staff. Use the seasonally-updated monovalent vaccine.'
        },
        {
            season: 'Travel & occupational risk assessment',
            detail: 'Provide hepatitis A, typhoid, rabies, yellow fever, polio boosters and others based on destination or job role. Offer malaria chemoprophylaxis advice separately.'
        }
    ],
    footnote: 'Verify timing, spacing, and product choice in the latest edition of the “Green Book” and local NHS immunisation updates before administering vaccines.'
};
