/**
 * Pregnancy and Breastfeeding Drug Safety Guide
 * Comprehensive reference for contraindicated drugs and safe alternatives
 */

export const pregnancyBreastfeedingData = {
    version: "1.0.0",
    lastUpdated: "2026-02-05",
    
    categories: [
        { id: "pregnancy_all", name: "All Trimesters", icon: "🚫" },
        { id: "pregnancy_t1", name: "First Trimester", icon: "1️⃣" },
        { id: "pregnancy_t2", name: "Second Trimester", icon: "2️⃣" },
        { id: "pregnancy_t3", name: "Third Trimester", icon: "3️⃣" },
        { id: "breastfeeding", name: "Breastfeeding", icon: "🤱" }
    ],

    // Drugs organized by class
    drugCategories: [
        {
            categoryName: "Cardiovascular",
            drugs: [
                {
                    drug: "ACE Inhibitors",
                    examples: ["Ramipril", "Lisinopril", "Perindopril", "Enalapril"],
                    pregnancy: {
                        allTrimesters: true,
                        t1: true,
                        t2: true,
                        t3: true,
                        reason: "Fetotoxic - renal dysgenesis, oligohydramnios, IUGR, skull hypoplasia, neonatal renal failure, death",
                        severity: "ABSOLUTE CONTRAINDICATION"
                    },
                    breastfeeding: {
                        contraindicated: false,
                        notes: "Small amounts in milk, use with caution in first few weeks after birth"
                    },
                    alternatives: {
                        pregnancy: "Methyldopa, Labetalol, Nifedipine",
                        breastfeeding: "Generally safe - Enalapril, Captopril preferred"
                    }
                },
                {
                    drug: "ARBs (Angiotensin Receptor Blockers)",
                    examples: ["Losartan", "Candesartan", "Irbesartan", "Valsartan"],
                    pregnancy: {
                        allTrimesters: true,
                        t1: true,
                        t2: true,
                        t3: true,
                        reason: "Similar fetotoxicity to ACE inhibitors - renal dysgenesis, oligohydramnios, IUGR",
                        severity: "ABSOLUTE CONTRAINDICATION"
                    },
                    breastfeeding: {
                        contraindicated: true,
                        notes: "Insufficient data - avoid"
                    },
                    alternatives: {
                        pregnancy: "Methyldopa, Labetalol, Nifedipine",
                        breastfeeding: "Alternative antihypertensives"
                    }
                },
                {
                    drug: "Statins",
                    examples: ["Atorvastatin", "Simvastatin", "Rosuvastatin", "Pravastatin"],
                    pregnancy: {
                        allTrimesters: true,
                        t1: true,
                        t2: true,
                        t3: true,
                        reason: "Congenital anomalies - developmental toxicity in animals, interferes with cholesterol synthesis",
                        severity: "CONTRAINDICATED"
                    },
                    breastfeeding: {
                        contraindicated: true,
                        notes: "Unknown if excreted in milk - potential for adverse effects"
                    },
                    alternatives: {
                        pregnancy: "Discontinue 3 months before conception - manage with diet",
                        breastfeeding: "Delay treatment or formula feed"
                    }
                },
                {
                    drug: "Amiodarone",
                    examples: ["Amiodarone"],
                    pregnancy: {
                        allTrimesters: true,
                        t1: true,
                        t2: true,
                        t3: true,
                        reason: "Neonatal goitre, hypo/hyperthyroidism, bradycardia, prematurity",
                        severity: "AVOID unless life-threatening arrhythmia"
                    },
                    breastfeeding: {
                        contraindicated: true,
                        notes: "Present in milk - risk of neonatal hypothyroidism"
                    },
                    alternatives: {
                        pregnancy: "β-blockers, Flecainide (specialist use)",
                        breastfeeding: "Alternative anti-arrhythmics - seek specialist advice"
                    }
                },
                {
                    drug: "Spironolactone",
                    examples: ["Spironolactone", "Eplerenone"],
                    pregnancy: {
                        allTrimesters: true,
                        t1: true,
                        t2: false,
                        t3: false,
                        reason: "Anti-androgenic effects - feminization of male fetus",
                        severity: "AVOID"
                    },
                    breastfeeding: {
                        contraindicated: true,
                        notes: "Metabolites in milk - manufacturer advises avoid"
                    },
                    alternatives: {
                        pregnancy: "Amiloride (limited data but safer)",
                        breastfeeding: "Alternative diuretics"
                    }
                }
            ]
        },
        {
            categoryName: "Antibiotics & Antimicrobials",
            drugs: [
                {
                    drug: "Tetracyclines",
                    examples: ["Doxycycline", "Lymecycline", "Tetracycline"],
                    pregnancy: {
                        allTrimesters: false,
                        t1: false,
                        t2: true,
                        t3: true,
                        reason: "Dental discoloration, enamel hypoplasia after 4-5 months gestation; maternal hepatotoxicity with IV use",
                        severity: "AVOID (especially 2nd/3rd trimester)"
                    },
                    breastfeeding: {
                        contraindicated: false,
                        notes: "Avoid prolonged use - theoretical risk of dental staining"
                    },
                    alternatives: {
                        pregnancy: "Penicillins, Cephalosporins, Erythromycin",
                        breastfeeding: "Generally safe at short courses"
                    }
                },
                {
                    drug: "Aminoglycosides",
                    examples: ["Gentamicin", "Amikacin", "Tobramycin"],
                    pregnancy: {
                        allTrimesters: true,
                        t1: true,
                        t2: true,
                        t3: true,
                        reason: "Ototoxicity - 8th cranial nerve damage, congenital deafness (especially streptomycin)",
                        severity: "AVOID unless essential - use with monitoring"
                    },
                    breastfeeding: {
                        contraindicated: false,
                        notes: "Minimal absorption from GI tract - acceptable for short courses"
                    },
                    alternatives: {
                        pregnancy: "β-lactams if possible, use aminoglycosides only if essential with drug level monitoring",
                        breastfeeding: "Safe in short courses with monitoring"
                    }
                },
                {
                    drug: "Quinolones",
                    examples: ["Ciprofloxacin", "Levofloxacin", "Moxifloxacin"],
                    pregnancy: {
                        allTrimesters: true,
                        t1: true,
                        t2: true,
                        t3: true,
                        reason: "Arthropathy in animal studies - cartilage damage in weight-bearing joints",
                        severity: "AVOID - use only if no alternative"
                    },
                    breastfeeding: {
                        contraindicated: false,
                        notes: "Small amounts in milk - avoid unless essential"
                    },
                    alternatives: {
                        pregnancy: "Cephalosporins, Nitrofurantoin (avoid at term), Trimethoprim",
                        breastfeeding: "Alternative antibiotics preferred"
                    }
                },
                {
                    drug: "Trimethoprim",
                    examples: ["Trimethoprim", "Co-trimoxazole"],
                    pregnancy: {
                        allTrimesters: false,
                        t1: true,
                        t2: false,
                        t3: false,
                        reason: "Folate antagonist - theoretical risk of neural tube defects, congenital malformations",
                        severity: "AVOID in 1st trimester"
                    },
                    breastfeeding: {
                        contraindicated: false,
                        notes: "Small amounts in milk - theoretical risk of neonatal haemolysis and methaemoglobinaemia"
                    },
                    alternatives: {
                        pregnancy: "Nitrofurantoin (avoid at term), Cefalexin; supplement 5mg folic acid if used",
                        breastfeeding: "Use with caution"
                    }
                },
                {
                    drug: "Metronidazole",
                    examples: ["Metronidazole"],
                    pregnancy: {
                        allTrimesters: false,
                        t1: true,
                        t2: false,
                        t3: false,
                        reason: "Theoretical risk in 1st trimester - avoid high doses",
                        severity: "AVOID high-dose in 1st trimester; oral/vaginal acceptable if necessary"
                    },
                    breastfeeding: {
                        contraindicated: false,
                        notes: "Significant amounts in milk - avoid large single doses; give after feeds"
                    },
                    alternatives: {
                        pregnancy: "Acceptable after 1st trimester for bacterial vaginosis, trichomoniasis",
                        breastfeeding: "Use short courses, time doses after feeds"
                    }
                },
                {
                    drug: "Nitrofurantoin",
                    examples: ["Nitrofurantoin"],
                    pregnancy: {
                        allTrimesters: false,
                        t1: false,
                        t2: false,
                        t3: true,
                        reason: "Risk of neonatal haemolysis if used at term due to immature erythrocyte enzyme systems",
                        severity: "AVOID at term (after 36 weeks)"
                    },
                    breastfeeding: {
                        contraindicated: true,
                        notes: "Avoid - risk of haemolysis in G6PD-deficient infants"
                    },
                    alternatives: {
                        pregnancy: "Cefalexin, Amoxicillin (safe throughout)",
                        breastfeeding: "Cefalexin, Amoxicillin"
                    }
                },
                {
                    drug: "Chloramphenicol",
                    examples: ["Chloramphenicol"],
                    pregnancy: {
                        allTrimesters: false,
                        t1: false,
                        t2: false,
                        t3: true,
                        reason: "Neonatal grey baby syndrome - circulatory collapse",
                        severity: "AVOID (especially 3rd trimester)"
                    },
                    breastfeeding: {
                        contraindicated: true,
                        notes: "Risk of bone marrow toxicity - theoretical risk of grey baby syndrome"
                    },
                    alternatives: {
                        pregnancy: "Alternative broad-spectrum antibiotics",
                        breastfeeding: "Alternative antibiotics"
                    }
                }
            ]
        },
        {
            categoryName: "Anticoagulants",
            drugs: [
                {
                    drug: "Warfarin",
                    examples: ["Warfarin"],
                    pregnancy: {
                        allTrimesters: true,
                        t1: true,
                        t2: true,
                        t3: true,
                        reason: "Warfarin embryopathy (6-12 weeks) - nasal hypoplasia, bone abnormalities; CNS malformations; fetal/maternal bleeding",
                        severity: "AVOID (especially weeks 6-12)"
                    },
                    breastfeeding: {
                        contraindicated: false,
                        notes: "Safe - not present in milk"
                    },
                    alternatives: {
                        pregnancy: "LMWH (Enoxaparin, Dalteparin) throughout pregnancy",
                        breastfeeding: "Warfarin is safe"
                    }
                },
                {
                    drug: "DOACs",
                    examples: ["Apixaban", "Rivaroxaban", "Edoxaban", "Dabigatran"],
                    pregnancy: {
                        allTrimesters: true,
                        t1: true,
                        t2: true,
                        t3: true,
                        reason: "Insufficient safety data - risk unknown, animal data suggests problems",
                        severity: "AVOID - manufacturer advises contraindication"
                    },
                    breastfeeding: {
                        contraindicated: true,
                        notes: "Insufficient data - manufacturer advises avoid"
                    },
                    alternatives: {
                        pregnancy: "LMWH (Enoxaparin, Dalteparin)",
                        breastfeeding: "Warfarin, LMWH"
                    }
                }
            ]
        },
        {
            categoryName: "Analgesics & NSAIDs",
            drugs: [
                {
                    drug: "NSAIDs",
                    examples: ["Ibuprofen", "Diclofenac", "Naproxen", "Aspirin >75mg"],
                    pregnancy: {
                        allTrimesters: false,
                        t1: false,
                        t2: false,
                        t3: true,
                        reason: "Premature closure of ductus arteriosus, persistent pulmonary hypertension, oligohydramnios, delayed labour",
                        severity: "AVOID from 30 weeks gestation onwards"
                    },
                    breastfeeding: {
                        contraindicated: false,
                        notes: "Ibuprofen preferred - lowest effective dose for shortest duration"
                    },
                    alternatives: {
                        pregnancy: "Paracetamol throughout; NSAIDs acceptable <30 weeks if essential",
                        breastfeeding: "Ibuprofen or Paracetamol"
                    }
                },
                {
                    drug: "Aspirin (high dose)",
                    examples: ["Aspirin >75mg daily"],
                    pregnancy: {
                        allTrimesters: false,
                        t1: false,
                        t2: false,
                        t3: true,
                        reason: "Impaired platelet function, delayed labour/delivery, premature closure of ductus arteriosus",
                        severity: "AVOID in 3rd trimester (low-dose 75mg for pre-eclampsia is safe)"
                    },
                    breastfeeding: {
                        contraindicated: false,
                        notes: "Avoid - possible link with Reye's syndrome; low-dose aspirin acceptable"
                    },
                    alternatives: {
                        pregnancy: "Paracetamol; Low-dose aspirin (75mg) is safe for pre-eclampsia prophylaxis",
                        breastfeeding: "Paracetamol, Ibuprofen"
                    }
                },
                {
                    drug: "Codeine",
                    examples: ["Codeine", "Co-codamol", "Co-dydramol"],
                    pregnancy: {
                        allTrimesters: false,
                        t1: false,
                        t2: false,
                        t3: false,
                        reason: "Neonatal withdrawal if prolonged use; respiratory depression (minimal risk with normal doses)",
                        severity: "USE WITH CAUTION - avoid prolonged use"
                    },
                    breastfeeding: {
                        contraindicated: true,
                        notes: "Risk of morphine toxicity in infant - infant deaths reported; MHRA warning against use",
                        severity: "CONTRAINDICATED"
                    },
                    alternatives: {
                        pregnancy: "Paracetamol alone; short courses acceptable if necessary",
                        breastfeeding: "Paracetamol, Ibuprofen"
                    }
                }
            ]
        },
        {
            categoryName: "Antidepressants & Psychiatry",
            drugs: [
                {
                    drug: "Paroxetine",
                    examples: ["Paroxetine"],
                    pregnancy: {
                        allTrimesters: false,
                        t1: true,
                        t2: false,
                        t3: false,
                        reason: "Increased risk of congenital heart defects (especially in 1st trimester)",
                        severity: "AVOID - prefer other SSRIs"
                    },
                    breastfeeding: {
                        contraindicated: false,
                        notes: "Present in milk - use with caution, monitor infant"
                    },
                    alternatives: {
                        pregnancy: "Sertraline, Fluoxetine (preferred SSRIs in pregnancy)",
                        breastfeeding: "Sertraline preferred (lowest levels in milk)"
                    }
                },
                {
                    drug: "Benzodiazepines",
                    examples: ["Diazepam", "Lorazepam", "Temazepam"],
                    pregnancy: {
                        allTrimesters: false,
                        t1: true,
                        t2: false,
                        t3: true,
                        reason: "T1: possible oral cleft; T3: floppy baby syndrome, neonatal withdrawal, respiratory depression",
                        severity: "AVOID if possible - use only if essential"
                    },
                    breastfeeding: {
                        contraindicated: false,
                        notes: "Sedation and feeding difficulties in infant - avoid prolonged use"
                    },
                    alternatives: {
                        pregnancy: "Psychological therapies; short-term use acceptable if severe anxiety",
                        breastfeeding: "Avoid or use lowest dose, shorter-acting preferred (e.g., Lorazepam)"
                    }
                },
                {
                    drug: "Lithium",
                    examples: ["Lithium carbonate"],
                    pregnancy: {
                        allTrimesters: false,
                        t1: true,
                        t2: false,
                        t3: false,
                        reason: "Ebstein's anomaly (cardiac malformation), neonatal goitre, polyhydramnios, toxicity in neonate",
                        severity: "AVOID if possible - specialist advice essential"
                    },
                    breastfeeding: {
                        contraindicated: true,
                        notes: "Present in milk - risk of toxicity in infant"
                    },
                    alternatives: {
                        pregnancy: "Antipsychotics (Olanzapine, Quetiapine) for acute mania - specialist input",
                        breastfeeding: "Alternative mood stabilizers - specialist advice"
                    }
                },
                {
                    drug: "Valproate",
                    examples: ["Sodium valproate"],
                    pregnancy: {
                        allTrimesters: true,
                        t1: true,
                        t2: true,
                        t3: true,
                        reason: "Neural tube defects (spina bifida 1-2%), facial abnormalities, developmental delay (30-40%), congenital malformations",
                        severity: "ABSOLUTE CONTRAINDICATION in women of childbearing potential (Pregnancy Prevention Programme)"
                    },
                    breastfeeding: {
                        contraindicated: false,
                        notes: "Present in milk but amount too small to be harmful"
                    },
                    alternatives: {
                        pregnancy: "Lamotrigine, Levetiracetam, Carbamazepine (all safer but still need specialist review)",
                        breastfeeding: "If essential, monitor infant"
                    }
                }
            ]
        },
        {
            categoryName: "Endocrine & Diabetes",
            drugs: [
                {
                    drug: "Oral Hypoglycaemics (most)",
                    examples: ["Gliclazide", "Pioglitazone", "SGLT2 inhibitors", "DPP4 inhibitors"],
                    pregnancy: {
                        allTrimesters: true,
                        t1: true,
                        t2: true,
                        t3: true,
                        reason: "Insufficient data; risk of congenital malformations and neonatal hypoglycaemia",
                        severity: "AVOID - switch to insulin"
                    },
                    breastfeeding: {
                        contraindicated: true,
                        notes: "Insufficient data - manufacturer advises avoid"
                    },
                    alternatives: {
                        pregnancy: "Insulin ± Metformin (acceptable in pregnancy)",
                        breastfeeding: "Insulin ± Metformin"
                    }
                },
                {
                    drug: "Metformin",
                    examples: ["Metformin"],
                    pregnancy: {
                        allTrimesters: false,
                        t1: false,
                        t2: false,
                        t3: false,
                        reason: "Generally considered safe - widely used for gestational diabetes and PCOS",
                        severity: "SAFE - specialist use"
                    },
                    breastfeeding: {
                        contraindicated: false,
                        notes: "Small amounts in milk - consider safe"
                    },
                    alternatives: {
                        pregnancy: "Insulin if additional glucose control needed",
                        breastfeeding: "Metformin is safe"
                    }
                },
                {
                    drug: "Carbimazole",
                    examples: ["Carbimazole"],
                    pregnancy: {
                        allTrimesters: false,
                        t1: true,
                        t2: false,
                        t3: false,
                        reason: "Congenital malformations (aplasia cutis, choanal/oesophageal atresia) - especially 1st trimester",
                        severity: "Use lowest effective dose; switch to Propylthiouracil in 1st trimester if possible"
                    },
                    breastfeeding: {
                        contraindicated: false,
                        notes: "Monitor infant's thyroid function - amounts in milk may be sufficient to affect neonatal thyroid"
                    },
                    alternatives: {
                        pregnancy: "Propylthiouracil preferred in 1st trimester; Carbimazole in 2nd/3rd trimester",
                        breastfeeding: "Continue with monitoring or switch to Propylthiouracil"
                    }
                }
            ]
        },
        {
            categoryName: "Dermatology & Retinoids",
            drugs: [
                {
                    drug: "Retinoids (oral)",
                    examples: ["Isotretinoin", "Acitretin"],
                    pregnancy: {
                        allTrimesters: true,
                        t1: true,
                        t2: true,
                        t3: true,
                        reason: "Severe teratogenicity - craniofacial, cardiac, thymic and CNS malformations",
                        severity: "ABSOLUTE CONTRAINDICATION - Pregnancy Prevention Programme mandatory"
                    },
                    breastfeeding: {
                        contraindicated: true,
                        notes: "AVOID - present in milk"
                    },
                    alternatives: {
                        pregnancy: "Topical treatments for acne; MUST use 2 forms of contraception + pregnancy testing",
                        breastfeeding: "Topical treatments"
                    }
                },
                {
                    drug: "Topical Retinoids",
                    examples: ["Tretinoin", "Adapalene gel"],
                    pregnancy: {
                        allTrimesters: true,
                        t1: true,
                        t2: true,
                        t3: true,
                        reason: "Theoretical risk - minimize absorption, avoid extensive application",
                        severity: "AVOID - minimal systemic absorption but avoid use"
                    },
                    breastfeeding: {
                        contraindicated: false,
                        notes: "Avoid - insufficient data"
                    },
                    alternatives: {
                        pregnancy: "Topical antibiotics (Erythromycin), Azelaic acid, Benzoyl peroxide",
                        breastfeeding: "Topical treatments with established safety"
                    }
                }
            ]
        },
        {
            categoryName: "Anticonvulsants",
            drugs: [
                {
                    drug: "Phenytoin",
                    examples: ["Phenytoin"],
                    pregnancy: {
                        allTrimesters: true,
                        t1: true,
                        t2: true,
                        t3: true,
                        reason: "Fetal hydantoin syndrome - craniofacial abnormalities, limb defects, developmental delay",
                        severity: "AVOID if possible - use only if essential with 5mg folic acid"
                    },
                    breastfeeding: {
                        contraindicated: false,
                        notes: "Small amounts in milk - monitor infant for sedation"
                    },
                    alternatives: {
                        pregnancy: "Lamotrigine, Levetiracetam (safer but specialist review essential)",
                        breastfeeding: "Monitor infant - acceptable with caution"
                    }
                },
                {
                    drug: "Carbamazepine",
                    examples: ["Carbamazepine"],
                    pregnancy: {
                        allTrimesters: false,
                        t1: true,
                        t2: false,
                        t3: false,
                        reason: "Neural tube defects (0.5-1%), craniofacial defects, developmental delay",
                        severity: "Use only if essential - 5mg folic acid pre-conception and throughout pregnancy"
                    },
                    breastfeeding: {
                        contraindicated: false,
                        notes: "Small amounts in milk - monitor infant"
                    },
                    alternatives: {
                        pregnancy: "Lamotrigine, Levetiracetam (lower risk but specialist review)",
                        breastfeeding: "Acceptable with infant monitoring"
                    }
                }
            ]
        },
        {
            categoryName: "Immunosuppressants & DMARDs",
            drugs: [
                {
                    drug: "Methotrexate",
                    examples: ["Methotrexate"],
                    pregnancy: {
                        allTrimesters: true,
                        t1: true,
                        t2: true,
                        t3: true,
                        reason: "Severe teratogen - craniofacial, skeletal and cardiac defects; fetal death",
                        severity: "ABSOLUTE CONTRAINDICATION - stop 3-6 months before conception + 5mg folic acid"
                    },
                    breastfeeding: {
                        contraindicated: true,
                        notes: "AVOID - manufacturer advises contraindication"
                    },
                    alternatives: {
                        pregnancy: "Hydroxychloroquine, Sulfasalazine (safe), Biologic agents (Certolizumab, Adalimumab - specialist)",
                        breastfeeding: "Alternative DMARDs or specialist biologic advice"
                    }
                },
                {
                    drug: "Mycophenolate",
                    examples: ["Mycophenolate mofetil"],
                    pregnancy: {
                        allTrimesters: true,
                        t1: true,
                        t2: true,
                        t3: true,
                        reason: "Congenital malformations (facial clefts, cardiac, renal), spontaneous abortion",
                        severity: "ABSOLUTE CONTRAINDICATION - stop 6 weeks before conception"
                    },
                    breastfeeding: {
                        contraindicated: true,
                        notes: "AVOID - manufacturer advises avoid"
                    },
                    alternatives: {
                        pregnancy: "Azathioprine, Tacrolimus (safer options - specialist use)",
                        breastfeeding: "Alternative immunosuppressants"
                    }
                },
                {
                    drug: "Leflunomide",
                    examples: ["Leflunomide"],
                    pregnancy: {
                        allTrimesters: true,
                        t1: true,
                        t2: true,
                        t3: true,
                        reason: "Teratogenic and fetotoxic in animal studies",
                        severity: "ABSOLUTE CONTRAINDICATION - washout procedure required (cholestyramine 8g TDS × 11 days)"
                    },
                    breastfeeding: {
                        contraindicated: true,
                        notes: "AVOID"
                    },
                    alternatives: {
                        pregnancy: "Hydroxychloroquine, Sulfasalazine",
                        breastfeeding: "Alternative DMARDs"
                    }
                }
            ]
        },
        {
            categoryName: "Other Important Drugs",
            drugs: [
                {
                    drug: "Finasteride / Dutasteride",
                    examples: ["Finasteride", "Dutasteride"],
                    pregnancy: {
                        allTrimesters: true,
                        t1: true,
                        t2: true,
                        t3: true,
                        reason: "Feminization of male fetus - abnormalities of external genitalia",
                        severity: "CONTRAINDICATED - women of childbearing age should not handle crushed tablets"
                    },
                    breastfeeding: {
                        contraindicated: true,
                        notes: "AVOID - not indicated for women"
                    },
                    alternatives: {
                        pregnancy: "N/A - not used in women",
                        breastfeeding: "N/A"
                    }
                },
                {
                    drug: "Ergotamine",
                    examples: ["Ergotamine"],
                    pregnancy: {
                        allTrimesters: true,
                        t1: true,
                        t2: true,
                        t3: true,
                        reason: "Oxytoxic - uterine contractions, vasoconstriction",
                        severity: "CONTRAINDICATED"
                    },
                    breastfeeding: {
                        contraindicated: true,
                        notes: "Ergotism in infant - vomiting, diarrhoea, weak pulse, unstable BP"
                    },
                    alternatives: {
                        pregnancy: "Paracetamol, Triptans (Sumatriptan has most data)",
                        breastfeeding: "Paracetamol, NSAIDs, Triptans"
                    }
                }
            ]
        }
    ],

    // Quick reference safety categories
    safetyCategories: {
        generallySafe: {
            name: "Generally Safe in Pregnancy",
            drugs: [
                "Paracetamol",
                "Penicillins (Amoxicillin, Flucloxacillin)",
                "Cephalosporins (Cefalexin, Cefuroxime)",
                "Erythromycin (not estolate)",
                "Azithromycin",
                "Insulin",
                "Metformin (specialist use)",
                "Levothyroxine",
                "Folic acid",
                "Iron supplements",
                "Vitamin D",
                "Methyldopa",
                "Labetalol",
                "Nifedipine",
                "Heparin / LMWH",
                "Ranitidine",
                "Omeprazole",
                "Lactulose",
                "Senna",
                "Antiemetics (Cyclizine, Promethazine, Ondansetron)"
            ]
        },
        generallySafeBreastfeeding: {
            name: "Generally Safe in Breastfeeding",
            drugs: [
                "Paracetamol",
                "Ibuprofen",
                "Penicillins",
                "Cephalosporins",
                "Most SSRIs (Sertraline preferred)",
                "Warfarin",
                "Heparin / LMWH",
                "Insulin",
                "Metformin",
                "Levothyroxine",
                "Folic acid",
                "Iron",
                "Vitamin D",
                "PPIs (Omeprazole)",
                "H2 antagonists",
                "Lactulose",
                "Senna"
            ]
        },
        absoluteContraindications: {
            name: "Absolute Contraindications in Pregnancy",
            drugs: [
                "ACE Inhibitors",
                "ARBs",
                "Statins",
                "Warfarin (especially weeks 6-12)",
                "DOACs",
                "Oral retinoids (Isotretinoin, Acitretin)",
                "Methotrexate",
                "Mycophenolate",
                "Leflunomide",
                "Valproate",
                "Finasteride/Dutasteride",
                "Misoprostol (unless for termination/induction)"
            ]
        }
    },

    // Resources and guidelines
    resources: [
        {
            name: "UK Teratology Information Service (UKTIS)",
            url: "https://www.uktis.org",
            description: "Specialist advice on medication in pregnancy"
        },
        {
            name: "BNF Pregnancy Guidance",
            url: "https://bnf.nice.org.uk/",
            description: "Up-to-date prescribing information"
        },
        {
            name: "RCOG Guidelines",
            url: "https://www.rcog.org.uk/",
            description: "Royal College guidance on medications in pregnancy"
        },
        {
            name: "Drugs in Lactation (LactMed)",
            url: "https://www.ncbi.nlm.nih.gov/books/NBK501922/",
            description: "US NIH database on drugs and breastfeeding"
        },
        {
            name: "Breastfeeding Network",
            url: "https://www.breastfeedingnetwork.org.uk/",
            description: "UK charity with medication information for breastfeeding"
        }
    ],

    // Clinical pearls
    clinicalPearls: [
        "Always check BNF and UKTIS for the most up-to-date information",
        "Many drug safety classifications are based on limited data - specialist advice often needed",
        "Folic acid 5mg daily should be given pre-conception and throughout pregnancy for women on antiepileptics",
        "Metformin is increasingly used in pregnancy (GDM, PCOS) but is off-license - specialist supervision",
        "LMWH is the anticoagulant of choice in pregnancy - warfarin and DOACs contraindicated",
        "Low-dose aspirin (75mg) is SAFE in pregnancy for pre-eclampsia prophylaxis despite NSAIDs being contraindicated",
        "Most drugs enter breast milk in small amounts - consider risk/benefit for each case",
        "Isotretinoin and valproate require Pregnancy Prevention Programme - mandatory contraception",
        "SSRIs: Sertraline preferred in breastfeeding (lowest milk levels); avoid Paroxetine in pregnancy (cardiac defects)",
        "Methotrexate: STOP 3-6 months before conception + 5mg folic acid until after delivery",
        "Neonatal withdrawal can occur with prolonged opiate, SSRI, or benzodiazepine use",
        "ACE inhibitors/ARBs: Fetotoxic - switch to Methyldopa, Labetalol or Nifedipine BEFORE conception if possible"
    ]
};

export default pregnancyBreastfeedingData;
