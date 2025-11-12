/**
 * Genetics reference data extracted from templates/index.html
 * Exported as an ES module for dynamic rendering by the Genetics panel
 */

export const geneticsDatabase = {
    'sickle-cell-disease': {
        title: 'Sickle Cell Disease',
        tags: ['Autosomal recessive', 'HBB missense (β-globin Glu6Val)'],
        sections: [
            {
                heading: 'Classic presentation',
                items: [
                    'Symptomatic after 6 months as HbF declines; dactylitis or severe hemolytic anemia in infancy.',
                    'Recurrent vaso-occlusive pain crises triggered by infection, dehydration, or hypoxia.',
                    'Functional asplenia → Howell-Jolly bodies, susceptibility to encapsulated organisms.',
                    'Protective heterozygous trait against severe Plasmodium falciparum malaria.'
                ]
            },
            {
                heading: 'Key complications',
                items: [
                    'Acute chest syndrome, stroke, avascular necrosis, priapism.',
                    'Salmonella osteomyelitis and overwhelming sepsis post-autosplenectomy.',
                    'Splenic sequestration crises in young children; chronic kidney injury.'
                ]
            }
        ],
        pearls: 'Hydroxyurea boosts HbF and reduces crises; give penicillin prophylaxis in childhood and vaccinate broadly (pneumococcus, meningococcus, Hib).'
    },
    'cystic-fibrosis': {
        title: 'Cystic Fibrosis',
        tags: ['Autosomal recessive', 'CFTR ΔF508 (Class II)'],
        sections: [
            {
                heading: 'Classic presentation',
                items: [
                    'Neonate with meconium ileus or failure to thrive; salty-tasting skin.',
                    'Chronic sinopulmonary infections (Staphylococcus aureus, later Pseudomonas) with productive cough and bronchiectasis.',
                    'Pancreatic insufficiency → steatorrhea, fat-soluble vitamin deficiency, recurrent nasal polyps.',
                    'Male infertility from congenital bilateral absence of the vas deferens.'
                ]
            },
            {
                heading: 'Diagnostic highlights',
                items: [
                    'Elevated sweat chloride (>60 mmol/L) on pilocarpine iontophoresis confirms diagnosis.',
                    'Newborn screen with immunoreactive trypsinogen; follow-up genetic sequencing or panel testing.',
                    'Obstructive lung disease with hyperinflation on imaging; fat malabsorption labs (↓fecal elastase).'
                ]
            }
        ],
        pearls: 'Airway clearance, aggressive infection control, and CFTR modulators (e.g., elexacaftor/tezacaftor/ivacaftor) improve survival; supplement pancreatic enzymes and ADEK vitamins.'
    },
    'trisomy-21': {
        title: 'Trisomy 21 (Down Syndrome)',
        tags: ['Meiotic nondisjunction (≈95%)', 'Robertsonian translocation (~4%)'],
        sections: [
            {
                heading: 'Classic features',
                items: [
                    'Hypotonia, developmental delay, flat facial profile, upslanting palpebral fissures, epicanthal folds.',
                    'Single palmar crease, sandal gap toes, Brushfield spots, excessive skin at the nape.',
                    'Congenital heart disease (atrioventricular septal defect), duodenal atresia, Hirschsprung disease.'
                ]
            },
            {
                heading: 'High-yield associations',
                items: [
                    '↑β-hCG, ↑inhibin A, ↓AFP, ↓estriol on second-trimester screening; ↑nuchal translucency.',
                    'Early-onset Alzheimer-like dementia (extra APP), increased risk of AML/ALL, atlantoaxial instability.',
                    'Thyroid dysfunction, obstructive sleep apnea, and chronic otitis media common in childhood.'
                ]
            }
        ],
        pearls: 'Offer parental karyotype if translocation suspected; counsel on prenatal screening and need for early cardiac and thyroid evaluation.'
    },
    'trisomy-18': {
        title: 'Trisomy 18 (Edwards Syndrome)',
        tags: ['Meiotic nondisjunction', 'Mosaicism rare (<5%)'],
        sections: [
            {
                heading: 'Classic features',
                items: [
                    'Severe growth restriction, micrognathia, low-set ears, prominent occiput.',
                    'Clenched fists with overlapping index over third finger, rocker-bottom feet.',
                    'Congenital heart defects (VSD/PDA), renal malformations, omphalocele or diaphragmatic hernia.'
                ]
            },
            {
                heading: 'Prenatal clues',
                items: [
                    'Quad screen: markedly ↓AFP, ↓β-hCG, ↓estriol, ↓inhibin A.',
                    'Ultrasound: choroid plexus cysts, clenched hands, single umbilical artery, polyhydramnios.',
                    'High mortality—median survival <1 year, often due to cardiac or respiratory failure.'
                ]
            }
        ],
        pearls: 'Supportive care discussions are essential; recurrence risk increases with advanced maternal age though far lower than trisomy 21.'
    },
    'marfan-syndrome': {
        title: 'Marfan Syndrome',
        tags: ['Autosomal dominant', 'FBN1 mutation (fibrillin-1)'],
        sections: [
            {
                heading: 'Classic features',
                items: [
                    'Tall, thin habitus with long limbs, arachnodactyly, hypermobile joints.',
                    'Lens subluxation (upward/outward) causing visual disturbances.',
                    'Pectus deformities, scoliosis, and high-arched palate common in adolescence.'
                ]
            },
            {
                heading: 'Critical complications',
                items: [
                    'Progressive aortic root dilation leading to aneurysm or dissection.',
                    'Mitral valve prolapse with regurgitation; risk of sudden cardiac death.',
                    'Dural ectasia causing chronic low back pain and neurologic symptoms.'
                ]
            }
        ],
        pearls: 'Beta-blockers or angiotensin receptor blockers slow aortic dilation; annual echocardiographic surveillance and lifestyle counseling (avoid contact sports) are essential.'
    },
    'fragile-x-syndrome': {
        title: 'Fragile X Syndrome',
        tags: ['X-linked dominant', 'FMR1 CGG repeat expansion'],
        sections: [
            {
                heading: 'Classic features',
                items: [
                    'Developmental delay and intellectual disability, often with autism spectrum behaviors.',
                    'Long, narrow face with large ears, prominent jaw, and high-arched palate.',
                    'Macroorchidism after puberty; hyperextensible joints and mitral valve prolapse.'
                ]
            },
            {
                heading: 'Diagnostic pearls',
                items: [
                    'Fragile site seen on cytogenetic testing due to methylated FMR1 promoter.',
                    'Prenatal diagnosis via chorionic villus sampling or amniocentesis for CGG repeat size.',
                    'Carrier females may have premature ovarian insufficiency or anxiety disorders.'
                ]
            }
        ],
        pearls: 'Early developmental interventions and behavioral therapy improve outcomes; consider genetic counseling for family planning and anticipation of fragile X-associated tremor/ataxia in older carriers.'
    },
    'turner-syndrome': {
        title: 'Turner Syndrome (45,X)',
        tags: ['X chromosome monosomy', 'Mosaicism in ~30%'],
        sections: [
            {
                heading: 'Classic features',
                items: [
                    'Short stature, webbed neck, low posterior hairline, broad chest with widely spaced nipples.',
                    'Streak ovaries causing primary amenorrhea and infertility; coarctation of the aorta or bicuspid aortic valve.',
                    'Lymphedema of hands/feet in neonates; horseshoe kidney and recurrent otitis media.'
                ]
            },
            {
                heading: 'Management essentials',
                items: [
                    'Growth hormone therapy in childhood to optimize adult height.',
                    'Estrogen replacement at puberty for secondary sexual development and bone health.',
                    'Screen for cardiovascular malformations, thyroid disease, and glucose intolerance.'
                ]
            }
        ],
        pearls: 'Elevated FSH/LH with low estrogen is typical; offer fertility counseling (donor oocyte IVF) and evaluate for aortic dilation prior to pregnancy.'
    },
    'nf1': {
        title: 'Neurofibromatosis Type 1',
        tags: ['Autosomal dominant', 'NF1 tumor suppressor (chromosome 17)'],
        sections: [
            {
                heading: 'Classic features',
                items: [
                    'Multiple café-au-lait macules and axillary/inguinal freckling by early childhood.',
                    'Lisch nodules (iris hamartomas) on slit lamp exam; optic pathway gliomas.',
                    'Cutaneous neurofibromas appearing in later childhood or adolescence.'
                ]
            },
            {
                heading: 'Key complications',
                items: [
                    'Learning disabilities, ADHD, and scoliosis are common.',
                    'Risk of malignant peripheral nerve sheath tumors and pheochromocytoma.',
                    'Hypertension from renal artery stenosis or catecholamine excess.'
                ]
            }
        ],
        pearls: 'Diagnosis requires ≥2 NIH criteria (skin findings, family history, or tumors); screen vision and blood pressure annually and counsel on autosomal dominant inheritance with variable expressivity.'
    },
    'pku': {
        title: 'Phenylketonuria (PKU)',
        tags: ['Autosomal recessive', 'Phenylalanine hydroxylase deficiency'],
        sections: [
            {
                heading: 'Classic presentation',
                items: [
                    'Normal at birth but develop intellectual disability without treatment.',
                    'Fair complexion, eczema, and musty/mousy body odor.',
                    'Seizures, growth failure, and microcephaly if phenylalanine is uncontrolled.'
                ]
            },
            {
                heading: 'Diagnostic pearls',
                items: [
                    'Newborn screening detects elevated phenylalanine.',
                    'Maternal PKU causes congenital heart defects, microcephaly, and growth restriction in offspring.',
                    'Tetrahydrobiopterin (BH4) defects present similarly but require cofactor supplementation.'
                ]
            }
        ],
        pearls: 'Lifelong low-phenylalanine diet with tyrosine supplementation prevents neurologic sequelae; women must normalize levels before conception to avoid teratogenic maternal PKU effects.'
    },
    'duchenne': {
        title: 'Duchenne Muscular Dystrophy',
        tags: ['X-linked recessive', 'DMD frameshift/nonsense'],
        sections: [
            {
                heading: 'Classic presentation',
                items: [
                    'Progressive proximal muscle weakness in boys age 2–5 with delayed motor milestones.',
                    'Calf pseudohypertrophy, Gowers sign, and waddling gait.',
                    'Markedly elevated CK and transaminases on screening labs.'
                ]
            },
            {
                heading: 'Key complications',
                items: [
                    'Cardiomyopathy with conduction abnormalities; requires regular cardiac imaging.',
                    'Progressive restrictive lung disease necessitating pulmonary function monitoring.',
                    'Loss of ambulation in adolescence and shortened lifespan without advanced care.'
                ]
            }
        ],
        pearls: 'Genetic testing detects out-of-frame deletions; offer carrier testing to female relatives and initiate glucocorticoids plus supportive respiratory/cardiac management early.'
    },
    'huntington-disease': {
        title: 'Huntington Disease',
        tags: ['Autosomal dominant', 'HTT CAG repeat expansion'],
        sections: [
            {
                heading: 'Classic features',
                items: [
                    'Onset in 30s–40s with choreiform movements and progressive gait instability.',
                    'Psychiatric changes (depression, irritability, psychosis) and cognitive decline.',
                    'Family history with anticipation; earlier and more severe disease through paternal transmission.'
                ]
            },
            {
                heading: 'Diagnostic highlights',
                items: [
                    'Caudate and putamen atrophy with ex vacuo ventriculomegaly on MRI.',
                    'Genetic testing quantifies CAG repeats (>36 pathogenic).',
                    '↓GABA, ↓ACh, and ↓substance P levels in basal ganglia.'
                ]
            }
        ],
        pearls: 'No disease-modifying therapy; manage symptoms (VMAT2 inhibitors for chorea) and provide genetic counseling with presymptomatic testing options for at-risk relatives.'
    }
};

export function getAllGenetics() {
    return geneticsDatabase;
}
