/**
 * Clinical Examination Guides Database
 * Extracted from V1 for V2 independence
 * Contains systematic examination approaches for major body systems
 */

export const examinationGuides =     {
        'cardiovascular': {
            title: 'Cardiovascular Examination',
            category: 'systemic',
            approach: 'General inspection → Hands → Pulse → Blood pressure → Face → Neck → Precordium → Back',
            sections: {
                'general-inspection': {
                    name: 'General Inspection',
                    technique: 'Observe patient from end of bed before approaching',
                    normal: 'Comfortable at rest, appropriate dress, no distress, normal colour',
                    abnormal: {
                        'Cyanosis': 'Central (tongue/lips): respiratory/cardiac causes. Peripheral (fingers/toes): poor circulation',
                        'Dyspnea': 'Breathlessness at rest or minimal exertion suggests heart failure',
                        'Cachexia': 'Muscle wasting in advanced heart failure (cardiac cachexia)',
                        'Pallor': 'May indicate anemia contributing to heart failure',
                        'Oedema': 'Bilateral ankle swelling, sacral edema if bed-bound'
                    },
                    clinicalPearls: 'Always introduce yourself and gain consent. Observe before touching'
                },
                'hands': {
                    name: 'Hand Examination',
                    technique: 'Inspect both hands, palpate radial pulse, assess capillary refill',
                    normal: 'Warm hands, pink nail beds, CRT <2 seconds, regular pulse',
                    abnormal: {
                        'Clubbing': 'Loss of angle between nail and nail bed. Causes: IE, congenital heart disease, lung disease',
                        'Splinter hemorrhages': 'Linear hemorrhages under nails - may indicate infective endocarditis',
                        'Janeway lesions': 'Painless palmar/plantar macules in infective endocarditis',
                        'Osler nodes': 'Painful pulp infarcts in fingers/toes - infective endocarditis',
                        'Cool peripheries': 'Poor perfusion, heart failure, shock',
                        'Prolonged CRT': '>2 seconds indicates poor perfusion'
                    },
                    clinicalPearls: 'Clubbing takes months to develop. Check both hands for symmetry'
                },
                'pulse': {
                    name: 'Pulse Assessment',
                    technique: 'Radial pulse rate, rhythm, character. Check for radio-radial delay',
                    normal: '60-100 bpm, regular rhythm, normal volume and character',
                    abnormal: {
                        'Tachycardia': '>100 bpm - fever, anxiety, hyperthyroidism, heart failure, arrhythmia',
                        'Bradycardia': '<60 bpm - athletes, medications (beta-blockers), heart block',
                        'Irregular rhythm': 'AF (irregularly irregular), ectopics, heart block',
                        'Weak pulse': 'Low volume - heart failure, shock, aortic stenosis',
                        'Bounding pulse': 'High volume - aortic regurgitation, hyperthyroidism, fever',
                        'Radio-radial delay': 'Coarctation of aorta, aortic dissection'
                    },
                    clinicalPearls: 'Palpate for 15 seconds minimum, 60 seconds if irregular. Check both radials simultaneously'
                },
                'blood-pressure': {
                    name: 'Blood Pressure',
                    technique: 'Appropriate cuff size, patient relaxed, arm at heart level',
                    normal: '<140/90 mmHg (or <130/80 mmHg in diabetes/CKD)',
                    abnormal: {
                        'Hypertension': 'Stage 1: 140-159/90-99, Stage 2: 160-179/100-109, Stage 3: ≥180/110',
                        'Hypotension': '<90 mmHg systolic - shock, medications, postural hypotension',
                        'Wide pulse pressure': '>60 mmHg - aortic regurgitation, hyperthyroidism',
                        'Narrow pulse pressure': '<30 mmHg - aortic stenosis, cardiac tamponade',
                        'Postural drop': '>20 mmHg fall on standing - dehydration, medications'
                    },
                    clinicalPearls: 'Repeat if abnormal. Check both arms if suspicious of coarctation/dissection'
                },
                'jvp': {
                    name: 'Jugular Venous Pressure',
                    technique: 'Patient at 45°, look for internal jugular pulsation, measure height above sternal angle',
                    normal: '<3 cm above sternal angle, normal waveform',
                    abnormal: {
                        'Elevated JVP': '>3 cm - right heart failure, fluid overload, tricuspid disease',
                        'Giant V waves': 'Tricuspid regurgitation - systolic waves in jugular vein',
                        'Cannon waves': 'Complete heart block - atria contract against closed tricuspid valve',
                        'Hepatojugular reflux': 'Rise in JVP with abdominal pressure - right heart failure',
                        'Absent pulsation': 'SVC obstruction - non-pulsatile, fixed elevation'
                    },
                    clinicalPearls: 'Distinguish from carotid pulsation - JVP has double waveform, varies with respiration'
                },
                'precordium': {
                    name: 'Precordial Examination',
                    technique: 'Inspect, palpate (apex, heaves, thrills), percuss cardiac borders, auscultate',
                    normal: 'No visible pulsations, apex beat 5th intercostal space mid-clavicular line',
                    abnormal: {
                        'Displaced apex': 'Lateral displacement - left ventricular enlargement',
                        'Heaves': 'Right ventricular heave (left sternal border) - pulmonary hypertension, RV enlargement',
                        'Thrills': 'Palpable murmurs - significant valvular disease (grade 4+ murmurs)',
                        'Systolic murmur': 'Aortic stenosis, mitral regurgitation, tricuspid regurgitation',
                        'Diastolic murmur': 'Always pathological - aortic regurgitation, mitral stenosis',
                        'Gallop rhythm': 'S3 (heart failure), S4 (stiff ventricle)'
                    },
                    clinicalPearls: 'Listen in all areas: aortic, pulmonary, tricuspid, mitral. Listen with diaphragm and bell'
                }
            }
        },
        'respiratory': {
            title: 'Respiratory Examination',
            category: 'systemic',
            approach: 'General inspection → Hands → Face → Neck → Chest inspection → Palpation → Percussion → Auscultation',
            sections: {
                'general-inspection': {
                    name: 'General Inspection',
                    technique: 'Observe breathing pattern, use of accessory muscles, positioning',
                    normal: 'Quiet breathing, 12-20 breaths/min, no accessory muscle use',
                    abnormal: {
                        'Tachypnea': '>20 breaths/min - pneumonia, asthma, anxiety, metabolic acidosis',
                        'Bradypnea': '<12 breaths/min - opioids, raised ICP, hypothyroidism',
                        'Accessory muscles': 'SCM, intercostals - respiratory distress',
                        'Tripod position': 'Leaning forward with arms supported - severe respiratory distress',
                        'Pursed lip breathing': 'COPD - creates back-pressure to prevent airway collapse'
                    },
                    clinicalPearls: 'Count respiratory rate when patient unaware. Look for pattern and effort'
                },
                'hands': {
                    name: 'Hand Examination',
                    technique: 'Inspect for clubbing, cyanosis, nicotine staining, assess asterixis',
                    normal: 'Pink nail beds, no clubbing, warm hands',
                    abnormal: {
                        'Clubbing': 'Lung cancer, bronchiectasis, lung abscess, IPF (not COPD/asthma)',
                        'Cyanosis': 'Central cyanosis indicates hypoxemia, peripheral indicates poor circulation',
                        'Nicotine staining': 'Yellow fingers - smoking history',
                        'Asterixis': 'CO2 retention - ask patient to hold hands up, look for flapping tremor',
                        'Wasting': 'Small muscle wasting in hands - lung cancer cachexia'
                    },
                    clinicalPearls: 'Clubbing rare in COPD unless complications. Asterixis also seen in liver failure'
                },
                'face-neck': {
                    name: 'Face and Neck',
                    technique: 'Inspect lips, eyes, lymph nodes, tracheal position',
                    normal: 'Pink lips, clear conjunctiva, central trachea, no lymphadenopathy',
                    abnormal: {
                        'Central cyanosis': 'Blue lips/tongue - hypoxemia (<85% saturation)',
                        'Pallor': 'Anemia - may contribute to dyspnea',
                        'Horner syndrome': 'Ptosis, miosis, anhidrosis - Pancoast tumor',
                        'Lymphadenopathy': 'Supraclavicular nodes - lung cancer metastases',
                        'Tracheal deviation': 'Away from tension pneumothorax, towards collapse/fibrosis'
                    },
                    clinicalPearls: 'Central cyanosis only visible when Hb <5g/dL is desaturated'
                },
                'chest-inspection': {
                    name: 'Chest Inspection',
                    technique: 'Observe shape, symmetry, movement, scars',
                    normal: 'Symmetrical expansion, no deformity, 1:2 AP to lateral ratio',
                    abnormal: {
                        'Barrel chest': 'Increased AP diameter - COPD with hyperinflation',
                        'Pectus carinatum': 'Pigeon chest - congenital, may restrict lung function',
                        'Pectus excavatum': 'Funnel chest - usually cosmetic only',
                        'Kyphoscoliosis': 'Spinal deformity - restrictive lung disease',
                        'Asymmetrical expansion': 'Pneumothorax, pleural effusion, consolidation'
                    },
                    clinicalPearls: 'Look for surgical scars (thoracotomy, lobectomy). Note chest wall movement'
                },
                'palpation': {
                    name: 'Palpation',
                    technique: 'Chest expansion, tactile vocal fremitus, apex beat',
                    normal: 'Symmetrical expansion >5cm, equal tactile fremitus',
                    abnormal: {
                        'Reduced expansion': 'Pain (pleurisy), pleural effusion, pneumothorax',
                        'Increased tactile fremitus': 'Consolidation - solid tissue transmits vibrations better',
                        'Reduced tactile fremitus': 'Pleural effusion, pneumothorax - fluid/air dampens vibrations',
                        'Pleural friction rub': 'Grating sensation - inflamed pleura rubbing together',
                        'Subcutaneous emphysema': 'Crackling under skin - pneumothorax with air leak'
                    },
                    clinicalPearls: 'Use "99" or "boy oh boy" for vocal fremitus. Compare symmetrical areas'
                },
                'percussion': {
                    name: 'Percussion',
                    technique: 'Percuss systematically comparing both sides, note resonance',
                    normal: 'Resonant throughout lung fields',
                    abnormal: {
                        'Dull percussion': 'Consolidation, pleural effusion - fluid/solid tissue',
                        'Stony dull': 'Large pleural effusion - completely dull note',
                        'Hyperresonant': 'Pneumothorax, emphysema - increased air content',
                        'Reduced percussion': 'Partial consolidation, small effusion',
                        'Shifting dullness': 'Free pleural fluid - changes with position'
                    },
                    clinicalPearls: 'Percuss from resonant to dull areas. Note upper level of effusions'
                },
                'auscultation': {
                    name: 'Auscultation',
                    technique: 'Systematic listening with diaphragm, compare both sides',
                    normal: 'Vesicular breath sounds, no added sounds',
                    abnormal: {
                        'Wheeze': 'Expiratory - asthma, COPD. Inspiratory stridor - upper airway obstruction',
                        'Crackles': 'Fine (pulmonary edema, fibrosis), coarse (pneumonia, bronchiectasis)',
                        'Pleural friction rub': 'Grating sound - pleural inflammation',
                        'Bronchial breathing': 'High-pitched, equal inspiration/expiration - consolidation',
                        'Reduced air entry': 'Pleural effusion, pneumothorax, severe consolidation',
                        'Absent breath sounds': 'Complete obstruction, massive effusion, pneumothorax'
                    },
                    clinicalPearls: 'Listen during full inspiration and expiration. Ask patient to breathe deeply through mouth'
                }
            }
        },
        'abdominal': {
            title: 'Abdominal Examination',
            category: 'systemic',
            approach: 'Look → Feel → Percuss → Listen (different order from other systems)',
            sections: {
                'inspection': {
                    name: 'Inspection',
                    technique: 'Patient supine, fully exposed abdomen, observe from different angles',
                    normal: 'Flat or gently rounded, no visible masses, symmetrical',
                    abnormal: {
                        'Distension': 'Generalized - ascites, obstruction, pregnancy. Localized - masses, organomegaly',
                        'Scars': 'Previous surgery - note location and implications',
                        'Striae': 'Stretch marks - pregnancy, weight gain, Cushing syndrome',
                        'Caput medusae': 'Dilated umbilical veins - portal hypertension',
                        'Visible peristalsis': 'Bowel obstruction - waves of contraction',
                        'Hernias': 'Inguinal, umbilical, incisional - may be more visible when coughing'
                    },
                    clinicalPearls: 'Look from foot of bed and from side. Ask patient to cough to reveal hernias'
                },
                'palpation-light': {
                    name: 'Light Palpation',
                    technique: 'Start away from pain, use flat of hand, superficial pressure',
                    normal: 'Soft, non-tender, no masses',
                    abnormal: {
                        'Tenderness': 'Localized - inflammation, infection. Generalized - peritonitis',
                        'Guarding': 'Voluntary muscle tension due to pain',
                        'Rigidity': 'Involuntary muscle spasm - peritoneal irritation',
                        'Masses': 'Note size, consistency, mobility, pulsatility',
                        'Hepatomegaly': 'Liver edge palpable below costal margin',
                        'Splenomegaly': 'Spleen tip palpable (enlarges towards RIF)'
                    },
                    clinicalPearls: 'Watch patient\'s face for signs of discomfort. Start gently'
                },
                'palpation-deep': {
                    name: 'Deep Palpation',
                    technique: 'Deeper pressure to feel for masses and organomegaly',
                    normal: 'No masses, organs not palpable (except sometimes liver edge)',
                    abnormal: {
                        'Hepatomegaly': 'Smooth edge (fatty liver), irregular (cirrhosis, metastases)',
                        'Splenomegaly': 'Moves with respiration, cannot get above it',
                        'Kidney masses': 'Ballotable, bimanual palpation in flanks',
                        'Aortic aneurysm': 'Pulsatile mass above umbilicus, expansile pulsation',
                        'Bladder': 'Suprapubic mass if full - dull to percussion',
                        'Rebound tenderness': 'Pain worse on releasing pressure - peritoneal irritation'
                    },
                    clinicalPearls: 'Feel for liver and spleen during inspiration. Use bimanual palpation for kidneys'
                },
                'percussion': {
                    name: 'Percussion',
                    technique: 'Percuss liver span, spleen, kidneys, bladder, test for ascites',
                    normal: 'Liver span 12-15cm, spleen not percussible, no shifting dullness',
                    abnormal: {
                        'Hepatomegaly': 'Increased liver span >15cm',
                        'Splenomegaly': 'Dullness in left hypochondrium',
                        'Ascites': 'Shifting dullness, fluid thrill (if large volume)',
                        'Bladder distension': 'Suprapubic dullness - urinary retention',
                        'Kidney enlargement': 'Flank dullness - polycystic kidneys, hydronephrosis'
                    },
                    clinicalPearls: 'Normal liver dullness from 5th intercostal space to costal margin'
                },
                'auscultation': {
                    name: 'Auscultation',
                    technique: 'Listen for bowel sounds, bruits, listen for 2 minutes if absent',
                    normal: 'Bowel sounds every 5-10 seconds, no bruits',
                    abnormal: {
                        'Absent bowel sounds': 'Paralytic ileus, peritonitis (listen for 2 minutes)',
                        'Hyperactive sounds': 'Bowel obstruction - high-pitched, frequent',
                        'Aortic bruit': 'Abdominal aortic aneurysm, atherosclerosis',
                        'Renal bruits': 'Renal artery stenosis - listen in flanks',
                        'Hepatic bruits': 'Hepatocellular carcinoma, alcoholic hepatitis',
                        'Venous hum': 'Portal hypertension - continuous sound at umbilicus'
                    },
                    clinicalPearls: 'Auscultate before deep palpation to avoid altering bowel sounds'
                }
            }
        },
        'neurological': {
            title: 'Neurological Examination',
            category: 'systemic',
            approach: 'Mental state → Cranial nerves → Motor → Sensory → Reflexes → Coordination → Gait',
            sections: {
                'mental-state': {
                    name: 'Mental State',
                    technique: 'Assess consciousness level, orientation, memory, attention',
                    normal: 'Alert, oriented to time/place/person, normal cognition',
                    abnormal: {
                        'Reduced GCS': '<15 - see GCS calculator for detailed assessment',
                        'Confusion': 'Disorientation, impaired attention - delirium, dementia',
                        'Memory loss': 'Short-term (recent events), long-term (remote events)',
                        'Dysphasia': 'Expressive (Broca), receptive (Wernicke), mixed',
                        'Neglect': 'Inattention to one side - usually right brain lesions',
                        'Apraxia': 'Cannot perform learned movements despite intact motor function'
                    },
                    clinicalPearls: 'Use MMSE or MoCA for detailed cognitive assessment. Note speech pattern'
                },
                'cranial-nerves': {
                    name: 'Cranial Nerves',
                    technique: 'Systematic assessment CN I-XII',
                    normal: 'All cranial nerves intact and functioning normally',
                    abnormal: {
                        'CN II (Optic)': 'Visual field defects, papilledema, optic atrophy',
                        'CN III (Oculomotor)': 'Ptosis, dilated pupil, eye movement problems',
                        'CN VII (Facial)': 'Facial weakness - upper motor neuron spares forehead',
                        'CN VIII (Acoustic)': 'Hearing loss, vertigo, tinnitus',
                        'CN IX/X': 'Dysphagia, dysphonia, absent gag reflex',
                        'CN XII (Hypoglossal)': 'Tongue deviation towards lesion side'
                    },
                    clinicalPearls: 'UMN facial weakness spares forehead, LMN affects all facial muscles'
                },
                'motor': {
                    name: 'Motor Examination',
                    technique: 'Inspect, tone, power (MRC scale), reflexes',
                    normal: 'Normal muscle bulk, normal tone, power 5/5, reflexes 2+',
                    abnormal: {
                        'Muscle wasting': 'LMN lesions, disuse atrophy, myopathy',
                        'Fasciculations': 'Visible muscle twitching - motor neuron disease',
                        'Increased tone': 'Spasticity (UMN), rigidity (Parkinson), clonus',
                        'Reduced tone': 'LMN lesions, cerebellar lesions, acute stroke',
                        'Weakness patterns': 'Pyramidal (extensors>flexors upper limb), proximal (myopathy)',
                        'Hyperreflexia': 'UMN lesions - brisk reflexes, upgoing plantars'
                    },
                    clinicalPearls: 'MRC scale: 0=no movement, 1=flicker, 2=movement without gravity, 3=against gravity, 4=against resistance, 5=normal'
                },
                'sensory': {
                    name: 'Sensory Examination',
                    technique: 'Test light touch, pain, vibration, proprioception',
                    normal: 'Intact sensation to all modalities',
                    abnormal: {
                        'Glove/stocking': 'Peripheral neuropathy - diabetes, alcohol, B12 deficiency',
                        'Dermatomal loss': 'Nerve root lesions - corresponds to specific dermatomes',
                        'Hemianesthesia': 'Stroke, thalamic lesions - one whole side affected',
                        'Suspended sensory loss': 'Syringomyelia - "cape" distribution',
                        'Vibration loss': 'Posterior column disease - B12, tabes dorsalis',
                        'Dissociated loss': 'Loss of pain/temperature with preserved touch'
                    },
                    clinicalPearls: 'Test from abnormal to normal areas. Use cotton wool and neurological pin'
                },
                'coordination': {
                    name: 'Coordination',
                    technique: 'Finger-nose test, heel-shin test, rapid alternating movements',
                    normal: 'Smooth, accurate movements, no tremor',
                    abnormal: {
                        'Intention tremor': 'Worse on movement - cerebellar lesions',
                        'Dysmetria': 'Past-pointing - cerebellar dysfunction',
                        'Dysdiadochokinesis': 'Impaired rapid alternating movements - cerebellum',
                        'Ataxia': 'Unsteady, uncoordinated movements',
                        'Resting tremor': 'Present at rest - Parkinson\'s disease',
                        'Action tremor': 'Essential tremor, anxiety, hyperthyroidism'
                    },
                    clinicalPearls: 'Cerebellar signs: DANISH - Dysdiadochokinesis, Ataxia, Nystagmus, Intention tremor, Speech, Hypotonia'
                },
                'gait': {
                    name: 'Gait Assessment',
                    technique: 'Observe normal walking, heel-toe walking, Romberg test',
                    normal: 'Steady, coordinated gait, negative Romberg',
                    abnormal: {
                        'Hemiplegic gait': 'Leg swings in arc - stroke, circumduction',
                        'Parkinsonian gait': 'Shuffling, reduced arm swing, festination',
                        'Ataxic gait': 'Wide-based, unsteady - cerebellar or sensory ataxia',
                        'High-stepping': 'Foot drop - common peroneal nerve palsy',
                        'Trendelenburg': 'Hip drops on weight-bearing - superior gluteal nerve',
                        'Positive Romberg': 'Falls when eyes closed - sensory ataxia'
                    },
                    clinicalPearls: 'Romberg tests proprioception - positive if worse with eyes closed'
                }
            }
        },
        'mental-state': {
            title: 'Mental State Examination',
            category: 'psychiatric',
            approach: 'Appearance → Behaviour → Speech → Mood → Thought → Perception → Cognition → Insight',
            sections: {
                'appearance': {
                    name: 'Appearance and Behaviour',
                    technique: 'Observe dress, hygiene, posture, facial expression, eye contact',
                    normal: 'Appropriately dressed, good hygiene, normal posture, appropriate eye contact',
                    abnormal: {
                        'Self-neglect': 'Poor hygiene, inappropriate dress - depression, dementia, schizophrenia',
                        'Agitation': 'Restlessness, pacing, fidgeting - anxiety, mania, drug withdrawal',
                        'Psychomotor retardation': 'Slowed movements, reduced facial expression - depression',
                        'Bizarre behaviour': 'Inappropriate actions - psychosis, dementia',
                        'Poor eye contact': 'Depression, autism, social anxiety, cultural factors'
                    },
                    clinicalPearls: 'Note cultural considerations. Observe throughout interview'
                },
                'speech': {
                    name: 'Speech Assessment',
                    technique: 'Assess rate, volume, tone, fluency, content',
                    normal: 'Normal rate, appropriate volume, coherent content',
                    abnormal: {
                        'Pressure of speech': 'Rapid, difficult to interrupt - mania, hyperthyroidism',
                        'Poverty of speech': 'Reduced amount - depression, schizophrenia',
                        'Flight of ideas': 'Rapid topic changes with logical connections - mania',
                        'Circumstantial speech': 'Excessive unnecessary detail but reaches point - anxiety',
                        'Word salad': 'Incoherent jumble of words - severe thought disorder'
                    },
                    clinicalPearls: 'Note both form (how they speak) and content (what they say)'
                },
                'mood-affect': {
                    name: 'Mood and Affect',
                    technique: 'Ask about mood, observe affect, assess congruence',
                    normal: 'Euthymic mood, appropriate affect, mood-affect congruent',
                    abnormal: {
                        'Depression': 'Low mood, reduced interest, anhedonia, hopelessness',
                        'Mania/Hypomania': 'Elevated mood, increased energy, decreased need for sleep',
                        'Anxiety': 'Worry, tension, fear, physical symptoms',
                        'Labile affect': 'Rapid mood changes - bipolar disorder, brain injury',
                        'Flat affect': 'Reduced emotional expression - schizophrenia, depression'
                    },
                    clinicalPearls: 'Mood = sustained emotional state. Affect = observed emotional expression'
                },
                'thought': {
                    name: 'Thought Assessment',
                    technique: 'Assess thought form, content, and possession',
                    normal: 'Logical, goal-directed thinking, no abnormal content',
                    abnormal: {
                        'Delusions': 'Fixed false beliefs - persecutory, grandiose, somatic',
                        'Thought broadcasting': 'Belief thoughts can be heard by others',
                        'Thought insertion': 'Belief thoughts put into mind by external force',
                        'Obsessions': 'Intrusive, unwanted thoughts - OCD',
                        'Suicidal ideation': 'Thoughts of self-harm - assess risk factors'
                    },
                    clinicalPearls: 'Always assess suicide risk. Distinguish overvalued ideas from delusions'
                },
                'perception': {
                    name: 'Perceptual Abnormalities',
                    technique: 'Ask about hallucinations, illusions, other perceptual disturbances',
                    normal: 'No hallucinations or perceptual disturbances',
                    abnormal: {
                        'Auditory hallucinations': 'Hearing voices - schizophrenia, severe depression',
                        'Visual hallucinations': 'Seeing things - delirium, dementia, substance use',
                        'Command hallucinations': 'Voices giving orders - high risk, requires urgent assessment',
                        'Illusions': 'Misperception of real stimuli - delirium, anxiety',
                        'Depersonalization': 'Feeling detached from self - anxiety, depression'
                    },
                    clinicalPearls: 'Command hallucinations require immediate risk assessment'
                },
                'cognition': {
                    name: 'Cognitive Assessment',
                    technique: 'Test orientation, attention, memory, executive function',
                    normal: 'Oriented x3, intact attention and memory',
                    abnormal: {
                        'Disorientation': 'Time first, then place, then person - delirium, dementia',
                        'Poor concentration': 'Cannot sustain attention - depression, anxiety, ADHD',
                        'Memory impairment': 'Short-term vs long-term - dementia, depression',
                        'Confabulation': 'False memories to fill gaps - Korsakoff syndrome',
                        'Poor insight': 'Lack awareness of illness - psychosis, dementia'
                    },
                    clinicalPearls: 'Use MMSE or MoCA for detailed assessment. Note pattern of deficits'
                }
            }
        },
        'thyroid': {
            title: 'Thyroid Examination',
            category: 'specialized',
            approach: 'General inspection → Neck inspection → Palpation → Auscultation → Functional assessment',
            sections: {
                'inspection': {
                    name: 'Inspection',
                    technique: 'Observe neck from front, look for swelling, scars, ask patient to swallow',
                    normal: 'No visible swelling, symmetrical neck, moves with swallowing',
                    abnormal: {
                        'Goitre': 'Visible thyroid enlargement, moves with swallowing',
                        'Thyroidectomy scar': 'Horizontal scar in lower neck - previous surgery',
                        'Asymmetry': 'One-sided swelling - nodule, carcinoma',
                        'Retrosternal extension': 'Goitre extending behind sternum',
                        'Skin changes': 'Pretibial myxoedema in Graves disease'
                    },
                    clinicalPearls: 'Thyroid moves with swallowing unlike lymph nodes'
                },
                'palpation': {
                    name: 'Palpation',
                    technique: 'Palpate from behind, locate isthmus and lobes, assess size, consistency, nodules',
                    normal: 'Barely palpable, soft, smooth, mobile',
                    abnormal: {
                        'Smooth enlargement': 'Graves disease, simple goitre, thyroiditis',
                        'Multinodular goitre': 'Multiple nodules, irregular surface',
                        'Single nodule': 'Solitary thyroid nodule - may be malignant',
                        'Hard, fixed mass': 'Suspicious for carcinoma',
                        'Tender thyroid': 'Thyroiditis (de Quervain, Hashimoto)'
                    },
                    clinicalPearls: 'Palpate during swallowing. Note consistency and mobility'
                },
                'lymph-nodes': {
                    name: 'Lymph Node Assessment',
                    technique: 'Palpate cervical, supraclavicular, and infraclavicular nodes',
                    normal: 'No palpable lymphadenopathy',
                    abnormal: {
                        'Cervical lymphadenopathy': 'Thyroid carcinoma metastases',
                        'Hard, fixed nodes': 'Malignant involvement',
                        'Multiple enlarged nodes': 'Systemic disease, infection',
                        'Supraclavicular nodes': 'Advanced malignancy',
                        'Tender nodes': 'Infection, inflammation'
                    },
                    clinicalPearls: 'Always examine lymph nodes in thyroid examination'
                },
                'functional-signs': {
                    name: 'Functional Assessment',
                    technique: 'Look for signs of hyper/hypothyroidism',
                    normal: 'No signs of thyroid dysfunction',
                    abnormal: {
                        'Hyperthyroid signs': 'Tremor, sweating, tachycardia, lid lag, exophthalmos',
                        'Hypothyroid signs': 'Bradycardia, dry skin, slow reflexes, hoarse voice',
                        'Graves ophthalmopathy': 'Lid retraction, proptosis, diplopia',
                        'Thyroid acropachy': 'Finger clubbing in severe Graves disease',
                        'Pretibial myxoedema': 'Thickened skin over shins in Graves'
                    },
                    clinicalPearls: 'Check pulse, reflexes, eyes. Lid lag = upper lid lags behind eyeball'
                }
            }
        },
        'lymph-nodes': {
            title: 'Lymph Node Examination',
            category: 'specialized',
            approach: 'Systematic examination of all lymph node groups → Assess characteristics → Look for primary source',
            sections: {
                'head-neck': {
                    name: 'Head and Neck Nodes',
                    technique: 'Palpate preauricular, postauricular, occipital, tonsillar, submandibular, submental, cervical chain',
                    normal: 'No palpable nodes or small (<1cm), soft, mobile nodes',
                    abnormal: {
                        'Cervical lymphadenopathy': 'URTI, EBV, CMV, toxoplasmosis, malignancy',
                        'Virchow node': 'Left supraclavicular node - abdominal malignancy',
                        'Tonsillar nodes': 'Throat infections, oral cavity malignancy',
                        'Submandibular nodes': 'Dental infections, oral cavity pathology',
                        'Postauricular nodes': 'Scalp infections, rubella'
                    },
                    clinicalPearls: 'Examine from behind patient. Note size, consistency, mobility'
                },
                'axillary': {
                    name: 'Axillary Nodes',
                    technique: 'Support patient arm, palpate central, anterior, posterior, infraclavicular, supraclavicular groups',
                    normal: 'No palpable axillary lymphadenopathy',
                    abnormal: {
                        'Axillary lymphadenopathy': 'Breast carcinoma, lymphoma, arm/hand infections',
                        'Fixed nodes': 'Malignant involvement, local invasion',
                        'Matted nodes': 'Multiple nodes stuck together - infection, malignancy',
                        'Supraclavicular nodes': 'Lung carcinoma, breast carcinoma metastases',
                        'Infraclavicular nodes': 'Breast carcinoma, lung pathology'
                    },
                    clinicalPearls: 'Examine with patient seated, arm relaxed and supported'
                },
                'inguinal': {
                    name: 'Inguinal Nodes',
                    technique: 'Palpate horizontal and vertical groups, examine external genitalia',
                    normal: 'Small, soft, mobile inguinal nodes may be normal',
                    abnormal: {
                        'Inguinal lymphadenopathy': 'STIs, genital infections, lower limb cellulitis',
                        'Unilateral enlargement': 'Local pathology, malignancy',
                        'Bilateral enlargement': 'Systemic disease, sexually transmitted infections',
                        'Hard, fixed nodes': 'Metastatic disease from pelvic organs',
                        'Tender nodes': 'Active infection, inflammation'
                    },
                    clinicalPearls: 'Small inguinal nodes often normal. Examine genitalia and lower limbs'
                },
                'generalized': {
                    name: 'Generalized Assessment',
                    technique: 'Examine all node groups, assess hepatosplenomegaly',
                    normal: 'No generalized lymphadenopathy',
                    abnormal: {
                        'Generalized lymphadenopathy': 'Lymphoma, leukaemia, viral infections, autoimmune',
                        'B symptoms': 'Fever, night sweats, weight loss - malignancy',
                        'Hepatosplenomegaly': 'Lymphoma, leukaemia, chronic infections',
                        'Waldeyer ring': 'Tonsillar involvement in lymphoma',
                        'Mediastinal nodes': 'Lymphoma, lung carcinoma (CXR required)'
                    },
                    clinicalPearls: 'Note pattern: localized vs generalized. Always examine liver and spleen'
                }
            }
        },
        'skin': {
            title: 'Skin Examination',
            category: 'specialized',
            approach: 'General inspection → Systematic examination → Dermoscopy → Documentation',
            sections: {
                'inspection': {
                    name: 'General Inspection',
                    technique: 'Good lighting, expose skin systematically, note distribution pattern',
                    normal: 'Normal skin colour, texture, temperature, no lesions',
                    abnormal: {
                        'Pallor': 'Anaemia, shock, vasospasm',
                        'Cyanosis': 'Central (cardiorespiratory), peripheral (cold, poor circulation)',
                        'Jaundice': 'Hepatic dysfunction, haemolysis, obstruction',
                        'Erythema': 'Inflammation, infection, drug reactions',
                        'Pigmentation changes': 'Vitiligo, melasma, post-inflammatory hyperpigmentation'
                    },
                    clinicalPearls: 'Use natural light when possible. Note symmetry and distribution'
                },
                'lesion-morphology': {
                    name: 'Lesion Morphology',
                    technique: 'Describe size, shape, colour, surface, borders, distribution',
                    normal: 'Normal skin without pathological lesions',
                    abnormal: {
                        'Macule': 'Flat, <1cm - freckles, café-au-lait spots',
                        'Papule': 'Raised, <1cm - seborrhoeic keratosis, naevi',
                        'Nodule': 'Raised, >1cm - basal cell carcinoma, melanoma',
                        'Vesicle': 'Fluid-filled, <1cm - herpes simplex, eczema',
                        'Ulcer': 'Loss of epidermis - venous, arterial, neuropathic'
                    },
                    clinicalPearls: 'Use dermoscopy for pigmented lesions. Photograph for monitoring'
                },
                'suspicious-lesions': {
                    name: 'Suspicious Lesions',
                    technique: 'ABCDE assessment for melanoma, check for red flag features',
                    normal: 'Benign-appearing lesions with regular features',
                    abnormal: {
                        'Melanoma (ABCDE)': 'Asymmetry, Border irregularity, Colour variation, Diameter >6mm, Evolving',
                        'Basal cell carcinoma': 'Pearly, rolled edge, central ulceration, telangiectasia',
                        'Squamous cell carcinoma': 'Scaly, hyperkeratotic, may ulcerate',
                        'Actinic keratosis': 'Rough, scaly patches on sun-exposed areas',
                        'Changing mole': 'Recent change in size, shape, colour, symptoms'
                    },
                    clinicalPearls: 'Ugly duckling sign - lesion different from others. 2-week rule for suspicious lesions'
                },
                'common-conditions': {
                    name: 'Common Skin Conditions',
                    technique: 'Recognize pattern and distribution of common dermatoses',
                    normal: 'Healthy skin without inflammatory or infectious conditions',
                    abnormal: {
                        'Eczema': 'Dry, itchy, flexural distribution in adults',
                        'Psoriasis': 'Well-demarcated plaques with silvery scale, extensor surfaces',
                        'Acne': 'Comedones, papules, pustules on face, chest, back',
                        'Cellulitis': 'Spreading erythema, warmth, tenderness, systemic upset',
                        'Fungal infections': 'Scaling, well-demarcated border, KOH positive'
                    },
                    clinicalPearls: 'Note distribution pattern - helpful for diagnosis. Consider systemic causes'
                }
            }
        },
        'musculoskeletal': {
            title: 'Musculoskeletal Examination',
            category: 'musculoskeletal',
            approach: 'Look → Feel → Move → Special tests → Function',
            sections: {
                'inspection': {
                    name: 'Inspection',
                    technique: 'Observe posture, gait, deformity, swelling, muscle wasting',
                    normal: 'Normal posture, no deformity, symmetrical muscle bulk',
                    abnormal: {
                        'Deformity': 'Angular (varus/valgus), rotational, fixed flexion',
                        'Swelling': 'Joint effusion, soft tissue oedema, bony enlargement',
                        'Muscle wasting': 'Disuse atrophy, neurological causes',
                        'Scars': 'Previous surgery, trauma',
                        'Skin changes': 'Erythema, warmth, rash'
                    },
                    clinicalPearls: 'Compare both sides. Expose joints above and below affected area'
                },
                'palpation': {
                    name: 'Palpation',
                    technique: 'Feel for tenderness, swelling, temperature, crepitus',
                    normal: 'No tenderness, normal temperature, no swelling',
                    abnormal: {
                        'Joint line tenderness': 'Arthritis, meniscal tears',
                        'Bony tenderness': 'Fracture, osteomyelitis',
                        'Soft tissue swelling': 'Inflammation, infection, bleeding',
                        'Crepitus': 'Osteoarthritis, fracture',
                        'Warmth': 'Inflammation, infection, crystal arthropathy'
                    },
                    clinicalPearls: 'Watch patient face for signs of discomfort. Palpate systematically'
                },
                'movement': {
                    name: 'Range of Movement',
                    technique: 'Active then passive movement, compare to normal side',
                    normal: 'Full range of movement, no pain',
                    abnormal: {
                        'Reduced range': 'Pain, stiffness, mechanical block, muscle weakness',
                        'Painful arc': 'Shoulder impingement, rotator cuff pathology',
                        'End-feel': 'Hard (bony), soft (muscle spasm), empty (pain)',
                        'Instability': 'Ligament rupture, chronic dislocation',
                        'Locking': 'Mechanical block - loose body, meniscal tear'
                    },
                    clinicalPearls: 'Active movement tests muscle power. Passive tests joint integrity'
                },
                'special-tests': {
                    name: 'Special Tests',
                    technique: 'Joint-specific tests for ligament integrity, impingement, instability',
                    normal: 'Negative special tests, stable joints',
                    abnormal: {
                        'McMurray test': 'Positive in meniscal tears (knee)',
                        'Anterior drawer': 'ACL rupture (knee), ankle instability',
                        'Thomas test': 'Hip flexion contracture',
                        'Schobers test': 'Reduced spinal flexion in ankylosing spondylitis',
                        'Tinel/Phalen signs': 'Carpal tunnel syndrome'
                    },
                    clinicalPearls: 'Know specific tests for each joint. Practice technique for accuracy'
                }
            }
        },
        'ent-basic': {
            title: 'Basic ENT Examination',
            category: 'specialized',
            approach: 'External inspection → Otoscopy → Hearing → Nose → Throat → Neck',
            sections: {
                'ears': {
                    name: 'Ear Examination',
                    technique: 'Inspect pinna, otoscopy (pull up and back in adults), hearing tests',
                    normal: 'Normal pinna, clear tympanic membrane, intact hearing',
                    abnormal: {
                        'Otitis externa': 'Red, swollen ear canal, discharge, pain on movement',
                        'Otitis media': 'Red, bulging tympanic membrane, fluid level',
                        'Perforated drum': 'Hole in tympanic membrane, discharge',
                        'Hearing loss': 'Conductive (wax, infection) vs sensorineural (age, noise)',
                        'Vertigo': 'Dizziness, nystagmus, balance problems'
                    },
                    clinicalPearls: 'Use largest speculum that fits. Pull pinna up and back in adults'
                },
                'nose': {
                    name: 'Nasal Examination',
                    technique: 'External inspection, anterior rhinoscopy, test patency',
                    normal: 'Patent nostrils, pink mucosa, no discharge',
                    abnormal: {
                        'Rhinitis': 'Swollen, red mucosa, discharge',
                        'Polyps': 'Pale, grape-like swellings',
                        'Deviated septum': 'Asymmetric nostrils, blocked airflow',
                        'Epistaxis': 'Nosebleeds - anterior (Little area) vs posterior',
                        'Anosmia': 'Loss of smell - viral, trauma, tumour'
                    },
                    clinicalPearls: 'Check airflow by occluding one nostril. Look for septal deviation'
                },
                'throat': {
                    name: 'Throat Examination',
                    technique: 'Inspect lips, teeth, tongue, throat with good light and tongue depressor',
                    normal: 'Pink mucosa, white teeth, no lesions, symmetrical soft palate',
                    abnormal: {
                        'Tonsillitis': 'Red, swollen tonsils, exudate, lymphadenopathy',
                        'Pharyngitis': 'Red throat, sore, may have exudate',
                        'Oral thrush': 'White plaques on tongue, buccal mucosa',
                        'Ulceration': 'Aphthous ulcers, viral, malignancy',
                        'Dental problems': 'Caries, abscesses, poor hygiene'
                    },
                    clinicalPearls: 'Use torch and tongue depressor. Check for referred ear pain'
                },
                'neck': {
                    name: 'Neck Examination',
                    technique: 'Inspect for swelling, palpate lymph nodes, thyroid, salivary glands',
                    normal: 'No swelling, no palpable lymph nodes, normal thyroid',
                    abnormal: {
                        'Lymphadenopathy': 'Infection, malignancy, systemic disease',
                        'Thyroid swelling': 'Goitre, nodules, carcinoma',
                        'Salivary gland swelling': 'Infection, stones, tumours',
                        'Neck masses': 'Thyroglossal cyst, branchial cyst, lymphoma',
                        'Torticollis': 'Muscle spasm, injury, infection'
                    },
                    clinicalPearls: 'Ask patient to swallow when examining thyroid. Palpate from behind'
                }
            }
        },
        'breast': {
            title: 'Breast Examination',
            category: 'primary_care',
            approach: 'Inspection → Palpation → Lymph nodes → Teaching self-examination',
            sections: {
                'inspection': {
                    name: 'Inspection',
                    technique: 'Patient seated, arms by sides, then raised, then hands on hips',
                    normal: 'Symmetrical breasts, no skin changes, normal nipples',
                    abnormal: {
                        'Asymmetry': 'Size difference, one breast higher - may be normal variant',
                        'Skin dimpling': 'Peau d\'orange, tethering - suspicious for malignancy',
                        'Nipple changes': 'Inversion, discharge, scaling - may indicate pathology',
                        'Visible lump': 'Obvious mass, skin changes over lump',
                        'Skin discoloration': 'Erythema, bruising, inflammatory changes'
                    },
                    clinicalPearls: 'Inspect in 3 positions: arms down, up, hands on hips. Look for symmetry'
                },
                'palpation': {
                    name: 'Palpation',
                    technique: 'Systematic palpation using pads of fingers, patient supine with arm behind head',
                    normal: 'Soft breast tissue, no discrete lumps, normal nodularity',
                    abnormal: {
                        'Breast lump': 'Discrete mass - assess size, consistency, mobility, skin attachment',
                        'Hard, fixed lump': 'Suspicious for malignancy - urgent referral',
                        'Soft, mobile lump': 'Likely benign - fibroadenoma, cyst',
                        'Skin tethering': 'Lump attached to skin - concerning feature',
                        'Nipple discharge': 'Bloody, unilateral - requires investigation'
                    },
                    clinicalPearls: 'Use flat of fingers, not fingertips. Examine in clockwise manner'
                },
                'lymph-nodes': {
                    name: 'Lymph Node Assessment',
                    technique: 'Palpate axillary, supraclavicular, and infraclavicular nodes',
                    normal: 'No palpable lymphadenopathy',
                    abnormal: {
                        'Axillary nodes': 'Most common site for breast cancer spread',
                        'Supraclavicular nodes': 'Advanced disease, poor prognosis',
                        'Fixed nodes': 'Malignant involvement likely',
                        'Multiple nodes': 'Extensive nodal disease',
                        'Tender nodes': 'May indicate infection or inflammation'
                    },
                    clinicalPearls: 'Always examine lymph nodes. Support patient\'s arm during examination'
                },
                'patient-education': {
                    name: 'Self-Examination Teaching',
                    technique: 'Teach monthly self-examination technique',
                    normal: 'Patient understands technique and timing',
                    abnormal: {
                        'Poor technique': 'Inadequate examination method',
                        'Infrequent checking': 'Not examining regularly',
                        'Anxiety about findings': 'Excessive worry about normal changes',
                        'Delayed presentation': 'Found lump but delayed seeking help',
                        'Lack of awareness': 'Doesn\'t know what to look for'
                    },
                    clinicalPearls: 'Best time is week after menstruation. Emphasize normal cyclical changes'
                }
            }
        },
        'prostate': {
            title: 'Prostate Examination',
            category: 'primary_care',
            approach: 'History → General examination → Digital rectal examination → Assessment',
            sections: {
                'preparation': {
                    name: 'Preparation and Consent',
                    technique: 'Explain procedure, obtain consent, position patient appropriately',
                    normal: 'Patient consented and positioned comfortably',
                    abnormal: {
                        'Patient anxiety': 'Excessive worry about procedure - reassurance needed',
                        'Positioning difficulties': 'Mobility issues, pain on positioning',
                        'Incomplete consent': 'Patient not fully informed',
                        'Cultural concerns': 'Religious or cultural objections',
                        'Previous trauma': 'History of abuse or difficult examinations'
                    },
                    clinicalPearls: 'Left lateral position most common. Explain each step as you proceed'
                },
                'inspection': {
                    name: 'Perianal Inspection',
                    technique: 'Inspect perianal area before digital examination',
                    normal: 'Normal perianal skin, no lesions',
                    abnormal: {
                        'Haemorrhoids': 'External piles, skin tags',
                        'Anal fissure': 'Painful tear in anal margin',
                        'Skin lesions': 'Warts, tumours, inflammatory conditions',
                        'Discharge': 'Mucus, blood, pus from anus',
                        'Prolapse': 'Rectal prolapse on straining'
                    },
                    clinicalPearls: 'Good lighting essential. Look for obvious pathology before palpation'
                },
                'digital-examination': {
                    name: 'Digital Rectal Examination',
                    technique: 'Lubricated finger, gentle insertion, systematic palpation of prostate',
                    normal: 'Smooth, firm, symmetrical prostate, size of walnut',
                    abnormal: {
                        'Enlarged prostate': 'BPH - smooth, symmetrical enlargement',
                        'Hard, irregular prostate': 'Suspicious for carcinoma - craggy, asymmetrical',
                        'Tender prostate': 'Prostatitis - acute inflammation',
                        'Nodules': 'Discrete lumps - may be malignant',
                        'Fixed prostate': 'Advanced carcinoma with local invasion'
                    },
                    clinicalPearls: 'Assess size, consistency, symmetry, mobility. Note patient discomfort'
                },
                'assessment': {
                    name: 'Clinical Assessment',
                    technique: 'Correlate findings with symptoms and PSA if available',
                    normal: 'Normal prostate examination, correlates with clinical picture',
                    abnormal: {
                        'LUTS symptoms': 'Lower urinary tract symptoms with enlarged prostate',
                        'Elevated PSA': 'High PSA with abnormal examination - urgent referral',
                        'Haematuria': 'Blood in urine with prostate abnormality',
                        'Bone pain': 'Back pain with hard prostate - metastases?',
                        'Weight loss': 'Constitutional symptoms with prostate mass'
                    },
                    clinicalPearls: 'PSA can be elevated 48hrs post-examination. Consider 2-week rule referral'
                }
            }
        },
        'eye': {
            title: 'Eye Examination',
            category: 'primary-care',
            approach: 'Visual acuity → External inspection → Pupil examination → Fundoscopy',
            sections: {
                'visual-acuity': {
                    name: 'Visual Acuity Testing',
                    technique: 'Snellen chart at 6 metres, test each eye separately with/without glasses',
                    normal: '6/6 vision in both eyes',
                    abnormal: {
                        'Reduced acuity': '6/9, 6/12, 6/18 etc - refractive error, pathology',
                        'Sudden visual loss': 'Acute onset - retinal detachment, stroke, temporal arteritis',
                        'Gradual visual loss': 'Cataracts, macular degeneration, glaucoma',
                        'Cannot read top line': 'Count fingers, hand movements, light perception',
                        'Metamorphopsia': 'Distorted vision - macular pathology'
                    },
                    clinicalPearls: 'Test with glasses on if worn. Pinhole improves refractive errors'
                },
                'external-examination': {
                    name: 'External Eye Examination',
                    technique: 'Inspect lids, conjunctiva, cornea, iris, pupils',
                    normal: 'Clear cornea, white sclera, pink conjunctiva, normal lids',
                    abnormal: {
                        'Red eye': 'Conjunctivitis, episcleritis, scleritis, acute glaucoma',
                        'Ptosis': 'Drooping eyelid - nerve palsy, muscle weakness',
                        'Proptosis': 'Bulging eye - thyroid, orbital tumour',
                        'Corneal opacity': 'Scar, infection, dystrophy',
                        'Jaundice': 'Yellow sclera - liver disease, haemolysis'
                    },
                    clinicalPearls: 'Use good lighting. Look for asymmetry between eyes'
                },
                'pupil-examination': {
                    name: 'Pupil Examination',
                    technique: 'Test pupil size, shape, light reflex, accommodation',
                    normal: 'Equal, round, reactive pupils (PEARL)',
                    abnormal: {
                        'Anisocoria': 'Unequal pupils - Horner syndrome, nerve palsy',
                        'Fixed dilated pupil': 'No light reflex - nerve damage, drugs',
                        'Relative afferent pupillary defect': 'RAPD - optic nerve pathology',
                        'Irregular pupil': 'Trauma, previous surgery, inflammation',
                        'Argyll Robertson pupil': 'Accommodates but doesn\'t react - neurosyphilis'
                    },
                    clinicalPearls: 'Swinging light test for RAPD. Note pupil size in light and dark'
                },
                'fundoscopy': {
                    name: 'Fundoscopy',
                    technique: 'Dilated pupils preferred, examine optic disc, macula, vessels',
                    normal: 'Pink optic disc, clear vessels, normal macula',
                    abnormal: {
                        'Papilloedema': 'Swollen optic disc - raised intracranial pressure',
                        'Diabetic retinopathy': 'Microaneurysms, haemorrhages, exudates',
                        'Hypertensive retinopathy': 'AV nipping, flame haemorrhages',
                        'Macular degeneration': 'Drusen, pigmentation, haemorrhage',
                        'Retinal detachment': 'Grey, elevated retina'
                    },
                    clinicalPearls: 'Use mydriatics for better view. Examine red reflex first'
                }
            }
        },
        'diabetic-foot': {
            title: 'Diabetic Foot Examination',
            category: 'primary-care',
            approach: 'Inspection → Vascular assessment → Neurological assessment → Risk stratification',
            sections: {
                'inspection': {
                    name: 'Foot Inspection',
                    technique: 'Examine both feet, between toes, soles, check footwear',
                    normal: 'Intact skin, no deformity, appropriate footwear',
                    abnormal: {
                        'Ulceration': 'Open wounds, typically painless in neuropathy',
                        'Callus formation': 'Thickened skin at pressure points',
                        'Deformity': 'Clawing, hammer toes, Charcot arthropathy',
                        'Skin changes': 'Dry skin, fissures, fungal infections',
                        'Poor footwear': 'Ill-fitting shoes, inappropriate for diabetes'
                    },
                    clinicalPearls: 'Remove shoes and socks completely. Use mirror to check soles'
                },
                'vascular-assessment': {
                    name: 'Vascular Assessment',
                    technique: 'Palpate foot pulses, check capillary refill, assess skin temperature',
                    normal: 'Palpable dorsalis pedis and posterior tibial pulses',
                    abnormal: {
                        'Absent pulses': 'Peripheral arterial disease',
                        'Cold feet': 'Poor circulation, arterial insufficiency',
                        'Prolonged capillary refill': '>2 seconds - poor perfusion',
                        'Dependent rubor': 'Red feet when dependent - severe PAD',
                        'Pallor on elevation': 'White feet when elevated - arterial disease'
                    },
                    clinicalPearls: 'Doppler may be needed if pulses not palpable. Check both feet'
                },
                'neurological-assessment': {
                    name: 'Neurological Assessment',
                    technique: 'Test vibration, pain, light touch, reflexes using monofilament',
                    normal: 'Intact sensation to 10g monofilament, normal reflexes',
                    abnormal: {
                        'Loss of protective sensation': 'Cannot feel 10g monofilament',
                        'Absent vibration sense': 'Tuning fork not felt - large fibre neuropathy',
                        'Reduced pain sensation': 'Cannot feel pinprick',
                        'Absent ankle reflexes': 'Peripheral neuropathy',
                        'Motor neuropathy': 'Weakness, muscle wasting, deformity'
                    },
                    clinicalPearls: '10g monofilament is gold standard. Test multiple sites on each foot'
                },
                'risk-stratification': {
                    name: 'Risk Assessment',
                    technique: 'Categorize risk level based on findings, plan follow-up',
                    normal: 'Low risk - normal sensation and circulation',
                    abnormal: {
                        'Low risk': 'No neuropathy, no PAD, no deformity',
                        'Moderate risk': 'Neuropathy OR PAD OR deformity',
                        'High risk': 'Neuropathy + PAD, or previous ulcer/amputation',
                        'Active pathology': 'Current ulcer, infection, acute Charcot',
                        'Urgent referral': 'Signs of infection, gangrene, acute ischaemia'
                    },
                    clinicalPearls: 'Annual screening for low risk, 3-6 monthly for high risk patients'
                }
            }
        },
        'blood-pressure': {
            title: 'Blood Pressure Measurement',
            category: 'primary-care',
            approach: 'Preparation → Correct technique → Interpretation → Follow-up planning',
            sections: {
                'preparation': {
                    name: 'Patient Preparation',
                    technique: 'Patient seated, 5 minutes rest, correct cuff size, arm supported',
                    normal: 'Patient relaxed, appropriate cuff size, correct positioning',
                    abnormal: {
                        'Incorrect cuff size': 'Too small (overestimates) or too large (underestimates)',
                        'Poor positioning': 'Arm unsupported, wrong height, talking during measurement',
                        'White coat effect': 'Elevated BP in medical setting only',
                        'Recent caffeine/smoking': 'Temporary elevation in BP',
                        'Full bladder': 'Can elevate BP readings'
                    },
                    clinicalPearls: 'Cuff should cover 80% of arm circumference. No talking during measurement'
                },
                'technique': {
                    name: 'Measurement Technique',
                    technique: 'Inflate 20mmHg above palpated systolic, deflate 2mmHg/second',
                    normal: 'Clear Korotkoff sounds, consistent readings',
                    abnormal: {
                        'Auscultatory gap': 'Silent period between systolic and diastolic',
                        'Irregular rhythm': 'Atrial fibrillation affects accuracy',
                        'Very high BP': '>180/110 - needs urgent assessment',
                        'Orthostatic hypotension': '>20mmHg drop on standing',
                        'Inter-arm difference': '>20mmHg difference - vascular pathology'
                    },
                    clinicalPearls: 'Take 2-3 readings, 1 minute apart. Check both arms initially'
                },
                'interpretation': {
                    name: 'Blood Pressure Categories',
                    technique: 'Classify BP according to NICE guidelines',
                    normal: 'Optimal <120/80, Normal <130/85',
                    abnormal: {
                        'High normal': '130-139/85-89 mmHg',
                        'Stage 1 hypertension': '140-159/90-99 mmHg (home >135/85)',
                        'Stage 2 hypertension': '160-179/100-109 mmHg (home >150/95)',
                        'Stage 3 hypertension': '≥180/110 mmHg - severe, consider admission',
                        'Isolated systolic hypertension': 'Systolic >140, diastolic <90'
                    },
                    clinicalPearls: 'ABPM/HBPM preferred for diagnosis. Clinic readings often higher'
                },
                'follow-up': {
                    name: 'Follow-up Planning',
                    technique: 'Plan appropriate monitoring and treatment based on risk',
                    normal: 'Annual check for normal BP',
                    abnormal: {
                        'Newly diagnosed hypertension': 'Assess cardiovascular risk, consider treatment',
                        'Uncontrolled hypertension': 'Review medications, lifestyle advice',
                        'Resistant hypertension': 'Consider specialist referral',
                        'Secondary hypertension': 'Young age, severe/resistant - investigate causes',
                        'Accelerated hypertension': 'Papilloedema, AKI - emergency treatment'
                    },
                    clinicalPearls: 'QRisk3 calculator for cardiovascular risk assessment'
                }
            }
        },
        'eye': {
            title: 'Eye Examination',
            category: 'specialized',
            approach: 'Visual acuity → Visual fields → Pupils → Eye movements → Fundoscopy',
            sections: {
                'visual-acuity': {
                    name: 'Visual Acuity',
                    technique: 'Snellen chart at 6m, test each eye separately, with/without correction',
                    normal: '6/6 vision in both eyes',
                    abnormal: {
                        'Reduced acuity': 'Refractive error, cataract, macular degeneration, amblyopia',
                        'Sudden vision loss': 'Retinal detachment, vascular occlusion, optic neuritis',
                        'Gradual vision loss': 'Cataract, glaucoma, diabetic retinopathy',
                        'Pinhole improvement': 'Suggests refractive error correctable with glasses',
                        'Bilateral loss': 'Cataracts, macular degeneration, optic neuropathy'
                    },
                    clinicalPearls: 'If cannot see top letter, use counting fingers, hand movements, light perception'
                },
                'visual-fields': {
                    name: 'Visual Field Assessment',
                    technique: 'Confrontation testing, each eye separately, compare to your own fields',
                    normal: 'Full visual fields to confrontation',
                    abnormal: {
                        'Bitemporal hemianopia': 'Pituitary tumor compressing optic chiasm',
                        'Homonymous hemianopia': 'Stroke affecting optic tract or radiation',
                        'Monocular loss': 'Retinal or optic nerve disease',
                        'Central scotoma': 'Macular disease, optic neuritis',
                        'Tunnel vision': 'Advanced glaucoma, retinitis pigmentosa'
                    },
                    clinicalPearls: 'Test all four quadrants. Map any defects. Urgent referral for acute changes'
                },
                'pupil-examination': {
                    name: 'Pupil Examination',
                    technique: 'Size, symmetry, reaction to light (direct and consensual), accommodation',
                    normal: 'Equal, round, reactive to light and accommodation (PERLA)',
                    abnormal: {
                        'RAPD': 'Relative afferent pupillary defect - optic nerve disease',
                        'Dilated pupil': 'Third nerve palsy, trauma, mydriatic drops, Adie pupil',
                        'Small pupil': 'Horner syndrome, old age, pilocarpine drops',
                        'Irregular pupil': 'Trauma, previous surgery, uveitis',
                        'Argyll Robertson': 'Accommodates but doesn\'t react to light - neurosyphilis'
                    },
                    clinicalPearls: 'Swinging flashlight test for RAPD. Check in dim light'
                },
                'eye-movements': {
                    name: 'Eye Movements',
                    technique: 'H-test pattern, check for nystagmus, cover test for squint',
                    normal: 'Full range of eye movements, no nystagmus, no diplopia',
                    abnormal: {
                        'Third nerve palsy': 'Eye down and out, ptosis, dilated pupil',
                        'Fourth nerve palsy': 'Vertical diplopia, head tilt',
                        'Sixth nerve palsy': 'Cannot abduct eye, horizontal diplopia',
                        'Internuclear ophthalmoplegia': 'MS - impaired adduction',
                        'Nystagmus': 'Cerebellar disease, vestibular pathology, medications'
                    },
                    clinicalPearls: 'Ask about diplopia. Note direction of gaze causing double vision'
                },
                'fundoscopy': {
                    name: 'Fundoscopy',
                    technique: 'Dilate pupils if possible, red reflex first, then disc, vessels, macula',
                    normal: 'Pink disc with clear margins, normal vessels, red reflex present',
                    abnormal: {
                        'Papilloedema': 'Raised ICP - blurred disc margins, no venous pulsation',
                        'Optic atrophy': 'Pale disc - previous inflammation, glaucoma, compression',
                        'Diabetic retinopathy': 'Microaneurysms, haemorrhages, exudates, neovascularization',
                        'Hypertensive retinopathy': 'AV nipping, flame haemorrhages, cotton wool spots',
                        'Retinal detachment': 'Grey, elevated retina, visual field defect'
                    },
                    clinicalPearls: 'Examine right eye with right eye. Start 15cm away to see red reflex'
                }
            }
        },
        'shoulder': {
            title: 'Shoulder Examination',
            category: 'musculoskeletal',
            approach: 'Look → Feel → Move → Special Tests',
            sections: {
                'inspection': {
                    name: 'Inspection',
                    technique: 'Compare both shoulders, look from front and back, observe scapulae',
                    normal: 'Symmetrical shoulders, normal contours, no swelling',
                    abnormal: {
                        'Muscle wasting': 'Deltoid, supraspinatus, infraspinatus wasting',
                        'Deformity': 'Anterior dislocation, AC joint prominence',
                        'Scapular winging': 'Serratus anterior weakness - long thoracic nerve injury',
                        'Swelling': 'Joint effusion, bursal swelling',
                        'Scars': 'Previous surgery, trauma'
                    },
                    clinicalPearls: 'Ask patient to undress to waist. Compare both sides'
                },
                'movement': {
                    name: 'Movement Assessment',
                    technique: 'Active movement (all directions), passive if limited, scapulohumeral rhythm',
                    normal: 'Abduction 180°, flexion 180°, internal/external rotation normal',
                    abnormal: {
                        'Painful arc 60-120°': 'Subacromial impingement, rotator cuff tendinopathy',
                        'Frozen shoulder': 'Globally restricted movement, passive = active limitation',
                        'Rotator cuff tear': 'Unable to initiate abduction or hold arm abducted',
                        'AC joint pain': 'Pain at end range of abduction/adduction across body',
                        'Scapulohumeral dysrhythmia': 'Abnormal scapular movement - weakness'
                    },
                    clinicalPearls: 'Note pain location and arc. Test active then passive movement'
                },
                'special-tests': {
                    name: 'Special Tests',
                    technique: 'Impingement tests, rotator cuff tests, stability tests',
                    normal: 'All special tests negative, stable shoulder',
                    abnormal: {
                        'Neer test positive': 'Forced flexion causes pain - impingement',
                        'Hawkins test positive': 'Internal rotation at 90° flexion - impingement',
                        'Empty can test positive': 'Weak/painful abduction at 90° - supraspinatus tear',
                        'Apprehension test positive': 'Fear of dislocation - anterior instability',
                        'Drop arm sign': 'Cannot slowly lower arm - massive rotator cuff tear'
                    },
                    clinicalPearls: 'Know your special tests. Practice technique. Consider imaging if positive'
                }
            }
        },
        'knee': {
            title: 'Knee Examination',
            category: 'musculoskeletal',
            approach: 'Look → Feel → Move → Ligaments → Special Tests',
            sections: {
                'inspection': {
                    name: 'Inspection',
                    technique: 'Observe standing, walking, lying. Look for swelling, deformity, muscle wasting',
                    normal: 'Straight alignment, no swelling, symmetrical quadriceps bulk',
                    abnormal: {
                        'Varus deformity': 'Bow-legged - medial compartment OA',
                        'Valgus deformity': 'Knock-kneed - lateral compartment OA, rickets',
                        'Swelling': 'Effusion, Baker cyst, bursitis, synovitis',
                        'Quadriceps wasting': 'Disuse atrophy, chronic knee pathology',
                        'Scars': 'Previous surgery, arthroscopy portals'
                    },
                    clinicalPearls: 'Measure thigh circumference if wasting suspected. Note gait pattern'
                },
                'palpation': {
                    name: 'Palpation',
                    technique: 'Temperature, effusion (patellar tap, bulge test), joint line, bony landmarks',
                    normal: 'No warmth, no effusion, non-tender joint lines',
                    abnormal: {
                        'Effusion': 'Patellar tap positive - moderate/large effusion',
                        'Joint line tenderness': 'Meniscal tear, OA, synovitis',
                        'Warmth': 'Infection, inflammatory arthritis, gout',
                        'Bursitis': 'Pre-patellar (housemaid), infrapatellar, anserine',
                        'Baker cyst': 'Popliteal fossa fullness, may rupture'
                    },
                    clinicalPearls: 'Bulge test more sensitive for small effusions. Always check temperature'
                },
                'ligament-tests': {
                    name: 'Ligament Assessment',
                    technique: 'Anterior drawer, Lachman, posterior drawer, valgus/varus stress',
                    normal: 'Stable knee, no excessive movement, firm endpoint',
                    abnormal: {
                        'ACL rupture': 'Positive Lachman, anterior drawer - anterior tibial subluxation',
                        'PCL rupture': 'Positive posterior drawer, posterior sag sign',
                        'MCL tear': 'Valgus stress causes pain and laxity',
                        'LCL tear': 'Varus stress causes pain and laxity',
                        'Multi-ligament injury': 'Unstable knee - major trauma'
                    },
                    clinicalPearls: 'Lachman more sensitive than anterior drawer. Test at 30° flexion'
                },
                'meniscal-tests': {
                    name: 'Meniscal Tests',
                    technique: 'McMurray test, Thessaly test, joint line tenderness',
                    normal: 'No clicking, no pain, full range of movement',
                    abnormal: {
                        'McMurray positive': 'Click/pain on rotation - meniscal tear',
                        'Locking': 'Sudden inability to fully extend - displaced meniscal tear',
                        'Giving way': 'Knee buckles - meniscal tear, ACL insufficiency',
                        'Joint line tenderness': 'Medial > lateral meniscal pathology',
                        'Thessaly test positive': 'Pain on rotation while standing - meniscal tear'
                    },
                    clinicalPearls: 'MRI gold standard for diagnosis. Arthroscopy may be needed'
                }
            }
        },
        'hip': {
            title: 'Hip Examination',
            category: 'musculoskeletal',
            approach: 'Look → Feel → Move → Special Tests → Functional assessment',
            sections: {
                'inspection': {
                    name: 'Inspection',
                    technique: 'Observe gait, standing posture, pelvic tilt, leg length, scars, muscle bulk',
                    normal: 'Symmetrical pelvis, normal gait, equal leg length, no scars or wasting',
                    abnormal: {
                        'Trendelenburg gait': 'Pelvic drop on contralateral side - hip abductor weakness',
                        'Leg length discrepancy': 'True or apparent shortening from hip pathology',
                        'Scars or swelling': 'Previous surgery, trauma, infection',
                        'Muscle wasting': 'Gluteal or quadriceps atrophy from chronic disease',
                        'Fixed flexion posture': 'Hip osteoarthritis, inflammatory arthropathy'
                    },
                    clinicalPearls: 'Watch the patient walk, turn and perform a single-leg stance for Trendelenburg'
                },
                'palpation': {
                    name: 'Palpation',
                    technique: 'Assess temperature, greater trochanter tenderness, ASIS/PSIS alignment, sacroiliac joints',
                    normal: 'Cool, non-tender hip region with aligned bony landmarks',
                    abnormal: {
                        'Greater trochanter tenderness': 'Trochanteric bursitis or gluteal tendinopathy',
                        'Warmth': 'Septic arthritis or inflammatory flare',
                        'Sacroiliac tenderness': 'Spondyloarthropathy, sacroiliitis',
                        'Pain on axial loading': 'Intra-articular pathology such as OA or fracture',
                        'Crepitus': 'Degenerative change or loose bodies'
                    },
                    clinicalPearls: 'Align knees and malleoli to assess apparent versus true leg length'
                },
                'movement': {
                    name: 'Movement Assessment',
                    technique: 'Active then passive flexion, extension, abduction, adduction, internal/external rotation',
                    normal: 'Flexion ~120°, internal rotation ~35°, external rotation ~45°, ab/adduction ~45°',
                    abnormal: {
                        'Loss of internal rotation first': 'Early hip osteoarthritis',
                        'Painful internal rotation': 'Slipped upper femoral epiphysis in adolescents',
                        'Fixed flexion deformity': 'Positive Thomas test - contracture or OA',
                        'Global restriction': 'Arthroplasty failure, adhesive capsulitis of hip, severe OA',
                        'Pain at extremes': 'Labral tear, impingement'
                    },
                    clinicalPearls: 'Perform Thomas test for flexion contracture; log roll for intra-articular pain'
                },
                'special-tests': {
                    name: 'Special Tests and Function',
                    technique: 'Trendelenburg, FABER/Patrick, FADIR/impingement, straight leg raise, functional tasks',
                    normal: 'Negative impingement tests, stable painless gait and single-leg stance',
                    abnormal: {
                        'Positive Trendelenburg': 'Gluteus medius/minimus weakness or superior gluteal nerve injury',
                        'Positive FABER': 'Sacroiliac or hip joint pathology causing pain',
                        'Positive FADIR': 'Femoroacetabular impingement or labral pathology',
                        'Straight leg raise pain': 'Lumbar radiculopathy mimicking hip pain',
                        'Antalgic gait': 'Pain-limited stance phase from acute hip pathology'
                    },
                    clinicalPearls: 'Assess ability to squat, climb stairs, and put on socks to gauge functional impact'
                }
            }
        },
        'spine-back': {
            title: 'Spine and Back Examination',
            category: 'musculoskeletal',
            approach: 'Look → Feel → Move → Neurological screen → Special tests',
            sections: {
                'inspection': {
                    name: 'Inspection',
                    technique: 'View from behind and side for posture, scoliosis, kyphosis, muscle bulk, scars',
                    normal: 'Straight spine with normal cervical, thoracic, lumbar curves and symmetrical musculature',
                    abnormal: {
                        'Scoliosis': 'Lateral curvature with rib hump on forward bend',
                        'Hyperkyphosis/lordosis': 'Postural or structural deformity',
                        'Muscle wasting or spasm': 'Chronic pain, nerve root involvement',
                        'Step deformity': 'Possible spondylolisthesis',
                        'Scars': 'Previous spinal surgery or trauma'
                    },
                    clinicalPearls: 'Ask patient to forward bend for Adams test; check leg length if scoliosis suspected'
                },
                'palpation': {
                    name: 'Palpation',
                    technique: 'Palpate spinous processes, paraspinal muscles, sacroiliac joints, note tenderness or warmth',
                    normal: 'Non-tender spine with supple paraspinal muscles and stable sacroiliac joints',
                    abnormal: {
                        'Point tenderness': 'Fracture, infection, malignancy, or inflammatory focus',
                        'Paraspinal spasm': 'Acute mechanical back pain, disc irritation',
                        'Warmth/swelling': 'Infection or inflammatory spondyloarthropathy',
                        'Sacroiliac tenderness': 'Sacroiliitis in spondyloarthropathy',
                        'Step-off': 'Spondylolisthesis causing palpable gap'
                    },
                    clinicalPearls: 'Percuss gently over spinous processes for vertebral tenderness; document neurological red flags'
                },
                'movement': {
                    name: 'Movement Assessment',
                    technique: 'Assess flexion, extension, lateral flexion, rotation; measure fingertip-to-floor distance',
                    normal: 'Smooth full range without pain; fingertips within a few centimetres of floor on flexion',
                    abnormal: {
                        'Reduced flexion with pain': 'Lumbar disc disease, mechanical back pain',
                        'Pain on extension': 'Facet joint arthropathy or spinal stenosis',
                        'Asymmetric movement': 'Scoliosis or muscle spasm limiting range',
                        'Neurological pain reproduction': 'Sciatica on movement provoking nerve root',
                        'Schober test reduction': 'Ankylosing spondylitis with limited lumbar flexion'
                    },
                    clinicalPearls: 'Use Schober test to quantify lumbar flexion; observe speed and control of movement'
                },
                'neurological-screen': {
                    name: 'Neurological Screen',
                    technique: 'Power, sensation, reflexes in lower limbs; straight leg raise/slump for nerve tension',
                    normal: 'Normal strength, intact dermatomes, symmetric reflexes, negative nerve tension tests',
                    abnormal: {
                        'Dermatomal sensory loss': 'Nerve root compression (e.g., L5, S1)',
                        'Weakness (e.g., foot drop)': 'L4/L5 radiculopathy or peroneal nerve palsy',
                        'Reduced ankle/knee reflexes': 'S1 or L3/4 root involvement',
                        'Positive straight leg raise': 'Radicular pain below knee suggesting disc herniation',
                        'Cauda equina signs': 'Saddle anaesthesia, sphincter disturbance - emergency'
                    },
                    clinicalPearls: 'Ask about red flags: weight loss, night pain, sphincter symptoms; urgent referral if present'
                }
            }
        },
        'hand-wrist': {
            title: 'Hand and Wrist Examination',
            category: 'musculoskeletal',
            approach: 'Look → Feel → Move → Function → Special tests',
            sections: {
                'inspection': {
                    name: 'Inspection',
                    technique: 'Hands on pillow palmar and dorsal side, look for deformity, swelling, scars, nails',
                    normal: 'No deformity or swelling, intact skin and nails, normal muscle bulk',
                    abnormal: {
                        'Swan neck/boutonnière': 'Rheumatoid arthritis deformities',
                        'Heberden/Bouchard nodes': 'Osteoarthritis changes at DIP/PIP joints',
                        'Thenar wasting': 'Median nerve compression (carpal tunnel)',
                        'Ulnar deviation': 'Advanced rheumatoid arthritis',
                        'Rheumatoid nodules or scars': 'Inflammatory arthritis or prior surgery'
                    },
                    clinicalPearls: 'Check nails for pitting (psoriatic arthritis) and colour changes (vascular or anaemia)'
                },
                'palpation': {
                    name: 'Palpation',
                    technique: 'Temperature, joint line tenderness MCP/PIP/DIP, wrist joint, snuffbox, tendon sheaths',
                    normal: 'Cool, non-tender joints with no synovial thickening',
                    abnormal: {
                        'Synovitis': 'Boggy MCP/PIP swelling in rheumatoid arthritis',
                        'Snuffbox tenderness': 'Scaphoid fracture until proven otherwise',
                        'Trigger finger': 'Palpable tendon nodule catching on flexion',
                        'Tenosynovitis': 'de Quervain pain over first dorsal compartment',
                        'Crepitus or nodules': 'Degenerative or inflammatory tendon changes'
                    },
                    clinicalPearls: 'Compare both hands; palpate with gentle squeeze of MCPs for global tenderness'
                },
                'movement': {
                    name: 'Movement and Function',
                    technique: 'Active and passive wrist flexion/extension, radial/ulnar deviation, finger flexion/extension, grip/pinch',
                    normal: 'Full painless range of motion with strong grip and pinch strength',
                    abnormal: {
                        'Restricted extension': 'Post-traumatic stiffness or OA',
                        'Pain on deviation': 'Wrist ligament injury or inflammatory arthritis',
                        'Weak grip': 'Pain inhibition, nerve compression, tendon rupture',
                        'Loss of thumb opposition': 'Median nerve dysfunction',
                        'Intrinsic minus posture': 'Ulnar nerve palsy'
                    },
                    clinicalPearls: 'Assess functional tasks like buttoning, writing, making a fist, and pincer grip'
                },
                'special-tests': {
                    name: 'Special Tests',
                    technique: 'Phalen, Tinel, Finkelstein, Allen test, Froment sign',
                    normal: 'Negative provocation tests without paraesthesia or pain',
                    abnormal: {
                        'Positive Phalen/Tinel': 'Median nerve compression (carpal tunnel syndrome)',
                        'Positive Finkelstein': 'Pain over radial styloid - de Quervain tenosynovitis',
                        'Positive Allen': 'Poor ulnar/radial collateral circulation',
                        'Positive Froment': 'Thumb IP flexion indicating ulnar nerve weakness',
                        'Carpal instability': 'Clicking/pain on Watson scaphoid shift test'
                    },
                    clinicalPearls: 'Assess neurovascular status (median/ulnar/radial nerves) and document sensation distribution'
                }
            }
        },
        'elbow': {
            title: 'Elbow Examination',
            category: 'musculoskeletal',
            approach: 'Look → Feel → Move → Special tests',
            sections: {
                'inspection': {
                    name: 'Inspection',
                    technique: 'Arm supported, check carrying angle, swelling, deformity, scars, muscle bulk',
                    normal: 'Symmetrical carrying angle with no swelling or deformity',
                    abnormal: {
                        'Loss of carrying angle': 'Previous fracture malunion or dislocation',
                        'Swelling or effusion': 'Infection, inflammation, trauma',
                        'Olecranon bursitis': 'Posterior swelling (student\'s elbow)',
                        'Muscle wasting': 'Disuse or nerve palsy (radial/ulnar)',
                        'Post-surgical scars': 'Previous ORIF or tendon procedures'
                    },
                    clinicalPearls: 'Inspect both anterior cubital fossa and posterior olecranon regions'
                },
                'palpation': {
                    name: 'Palpation',
                    technique: 'Temperature, olecranon, medial/lateral epicondyles, radial head, joint line, bursa',
                    normal: 'Cool, non-tender joint with intact bony landmarks',
                    abnormal: {
                        'Lateral epicondyle tenderness': 'Tennis elbow (lateral epicondylitis)',
                        'Medial epicondyle tenderness': 'Golfer\'s elbow (medial epicondylitis)',
                        'Olecranon tenderness': 'Bursitis, fracture, gout',
                        'Posterior fat pad sign': 'Effusion suggesting intra-articular fracture',
                        'Painful radial head': 'Subluxation, fracture, or arthritis'
                    },
                    clinicalPearls: 'Assess neurovascular status of radial, median, and ulnar nerves in the hand'
                },
                'movement': {
                    name: 'Movement',
                    technique: 'Active and passive flexion/extension, supination/pronation, compare sides',
                    normal: 'Flexion ~150°, full extension to 0°, symmetrical supination/pronation',
                    abnormal: {
                        'Loss of extension': 'Intra-articular pathology, fracture sequelae, contracture',
                        'Pain on resisted extension': 'Lateral epicondylitis',
                        'Pain on resisted flexion/pronation': 'Medial epicondylitis',
                        'Crepitus through range': 'Arthritis or loose bodies',
                        'Mechanical block': 'Locked osteochondral fragment'
                    },
                    clinicalPearls: 'Check carrying angle in extension; compare functional tasks like lifting or pushing'
                },
                'special-tests': {
                    name: 'Special Tests',
                    technique: 'Cozen and Mill tests for lateral epicondylitis, valgus/varus stress for collateral ligaments, Tinel at cubital tunnel',
                    normal: 'Stable elbow with negative provocation tests',
                    abnormal: {
                        'Positive Cozen/Mill': 'Pain over lateral epicondyle - tennis elbow',
                        'Valgus laxity/pain': 'Ulnar collateral ligament injury',
                        'Varus laxity/pain': 'Radial collateral ligament injury',
                        'Positive Tinel at elbow': 'Ulnar nerve entrapment (cubital tunnel syndrome)',
                        'Posterolateral rotatory instability': 'Positive pivot shift or chair push-up tests'
                    },
                    clinicalPearls: 'Assess functional grip and ability to push from a chair; consider imaging for instability'
                }
            }
        },
        'ankle-foot': {
            title: 'Ankle and Foot Examination',
            category: 'musculoskeletal',
            approach: 'Look → Feel → Move → Stability → Special tests',
            sections: {
                'inspection': {
                    name: 'Inspection',
                    technique: 'Observe standing alignment, arches, hindfoot position, swelling, callosities, gait',
                    normal: 'Neutral hindfoot with maintained arches, no swelling or callus, normal gait',
                    abnormal: {
                        'Pes planus/pes cavus': 'Flat foot or high arch causing altered mechanics',
                        'Hallux valgus': 'Bunion deformity at first MTP joint',
                        'Heel valgus/varus': 'Hindfoot malalignment (e.g., posterior tibial dysfunction)',
                        'Calluses or ulcers': 'Pressure points, neuropathy or vascular disease',
                        'Swelling/bruising': 'Acute sprain, fracture, inflammatory arthropathy'
                    },
                    clinicalPearls: 'Watch gait for antalgia and ability to tiptoe/heel-walk for calf and anterior tibial strength'
                },
                'palpation': {
                    name: 'Palpation',
                    technique: 'Check temperature, malleoli, ligaments (ATFL/CFL/PTFL/deltoid), Achilles tendon, midfoot and forefoot joints',
                    normal: 'Cool, non-tender structures with intact Achilles and stable ligament palpation',
                    abnormal: {
                        'Tender ATFL/CFL': 'Lateral ankle sprain',
                        'Deltoid ligament tenderness': 'Medial sprain or fracture',
                        'Achilles tenderness/gap': 'Tendinopathy or rupture (positive Thompson test)',
                        'Midfoot pain': 'Lisfranc injury if plantar ecchymosis present',
                        'Metatarsal tenderness': 'Stress fracture or Morton neuroma'
                    },
                    clinicalPearls: 'Palpate proximal fibula for associated Maisonneuve fracture after ankle sprain'
                },
                'movement': {
                    name: 'Movement and Strength',
                    technique: 'Active/passive dorsiflexion, plantarflexion, inversion, eversion; resisted movements',
                    normal: 'Symmetrical painless range with strong resisted movements',
                    abnormal: {
                        'Restricted dorsiflexion': 'Anterior impingement or gastrocnemius tightness',
                        'Painful inversion/eversion': 'Ligament injury or subtalar pathology',
                        'Weak plantarflexion': 'Achilles rupture or tibial nerve dysfunction',
                        'Crepitus': 'Arthritic changes in ankle or midfoot',
                        'Tight calf': 'Silfverskiöld test showing gastrocnemius contracture'
                    },
                    clinicalPearls: 'Compare weight-bearing and non-weight-bearing dorsiflexion; assess single-leg calf raises'
                },
                'stability-tests': {
                    name: 'Stability and Special Tests',
                    technique: 'Anterior drawer and talar tilt for instability, Thompson for Achilles rupture, squeeze and external rotation tests for syndesmosis',
                    normal: 'Stable ankle with firm endpoints and negative rupture tests',
                    abnormal: {
                        'Positive anterior drawer/talar tilt': 'Lateral ligament instability',
                        'Positive Thompson': 'No plantarflexion indicating Achilles rupture',
                        'Squeeze/external rotation pain': 'Syndesmosis (high ankle) sprain',
                        'Painful calcaneal squeeze': 'Calcaneal stress fracture',
                        'Positive Mulder click': 'Morton neuroma between metatarsals'
                    },
                    clinicalPearls: 'Assess footwear and orthotics; document neurovascular status of foot'
                }
            }
        },
        'peripheral-vascular': {
            title: 'Peripheral Vascular Examination',
            category: 'vascular',
            approach: 'General inspection → Hands → Upper limb pulses → Lower limb pulses → Special tests',
            sections: {
                'inspection': {
                    name: 'General Inspection',
                    technique: 'Look for colour changes, ulcers, scars, hair loss, swelling. Assess temperature and capillary refill',
                    normal: 'Pink, warm limbs with intact hair and nails, no ulcers or oedema, CRT <2 seconds',
                    abnormal: {
                        'Pallor or cyanosis': 'Poor perfusion or acute ischemia',
                        'Hair loss/shiny skin': 'Chronic arterial insufficiency',
                        'Ulcers': 'Arterial (punched out, painful) vs venous (irregular, medial malleolus)',
                        'Varicose veins': 'Venous insufficiency with dilated, tortuous veins',
                        'Peripheral oedema': 'Venous disease, lymphoedema, cardiac/renal causes'
                    },
                    clinicalPearls: 'Compare limbs side to side. Document location and characteristics of ulcers'
                },
                'upper-limb-vascular': {
                    name: 'Upper Limb Pulses and Perfusion',
                    technique: 'Palpate radial, ulnar, brachial pulses; check radio-radial and radio-femoral delay; Allen test for collateral flow',
                    normal: 'Symmetrical pulses with no delay and brisk capillary refill',
                    abnormal: {
                        'Weak or absent radial pulse': 'Arterial insufficiency, thrombosis, or embolus',
                        'Radio-radial delay': 'Coarctation of aorta or subclavian stenosis',
                        'Allen test positive': 'Poor collateral circulation to hand',
                        'Brachial bruits': 'Proximal arterial stenosis',
                        'Cool, pale hand': 'Acute limb ischemia - emergency'
                    },
                    clinicalPearls: 'Assess blood pressure in both arms if suspicion of subclavian pathology'
                },
                'lower-limb-vascular': {
                    name: 'Lower Limb Pulses and Perfusion',
                    technique: 'Palpate femoral, popliteal, posterior tibial, dorsalis pedis pulses; assess temperature gradient and capillary refill',
                    normal: 'Palpable distal pulses with warm feet and normal CRT',
                    abnormal: {
                        'Diminished foot pulses': 'Peripheral arterial disease or acute occlusion',
                        'Femoral bruit': 'Atherosclerotic disease',
                        'Temperature gradient': 'Cool distally suggests arterial insufficiency',
                        'Dependent rubor/elevation pallor': 'Critical limb ischemia',
                        'Venous engorgement/varicosities': 'Venous insufficiency'
                    },
                    clinicalPearls: 'Use Doppler if pulses not palpable; compare both legs and document ankle-brachial pressure index if possible'
                },
                'special-tests': {
                    name: 'Special Tests',
                    technique: 'Buerger test for arterial insufficiency, ABPI measurement, Trendelenburg and Perthes tests for varicose veins',
                    normal: 'No colour change on elevation, ABPI 0.9-1.3, competent venous valves',
                    abnormal: {
                        'Buerger angle <20°': 'Severe arterial disease with pallor on minimal elevation',
                        'ABPI <0.9': 'Peripheral arterial disease; <0.5 indicates critical ischemia',
                        'Rapid venous filling on Trendelenburg': 'Incompetent superficial valves',
                        'Pain on calf compression': 'Consider DVT (Homan sign not specific)',
                        'Venous eczema/lipodermatosclerosis': 'Chronic venous insufficiency'
                    },
                    clinicalPearls: 'Always assess neurological status and document rest/night pain or claudication distance'
                }
            }
        },
        'renal-urological': {
            title: 'Renal and Urological Examination',
            category: 'systemic',
            approach: 'General inspection → Abdomen → Renal angles → Bladder → Urinalysis',
            sections: {
                'general-inspection': {
                    name: 'General Inspection',
                    technique: 'Assess hydration, pallor, oedema, scars, catheter or stoma, dialysis access',
                    normal: 'Well hydrated, no oedema or scars, no drains or catheters',
                    abnormal: {
                        'Pallor or sallow complexion': 'Chronic kidney disease anemia',
                        'Periorbital or peripheral oedema': 'Nephrotic syndrome or fluid overload',
                        'AV fistula': 'Dialysis access; feel thrill and listen for bruit',
                        'Catheters or nephrostomies': 'Recent urological intervention',
                        'Scratch marks': 'Uraemic pruritus in advanced CKD'
                    },
                    clinicalPearls: 'Check blood pressure and weight trends; review fluid balance and medications'
                },
                'abdominal-assessment': {
                    name: 'Abdominal Assessment',
                    technique: 'Inspect for distension or scars, palpate for masses, enlarged kidneys or bladder, percuss for ascites',
                    normal: 'Soft, non-tender abdomen with no palpable kidneys or bladder',
                    abnormal: {
                        'Palpable ballotable kidney': 'Hydronephrosis or polycystic kidney disease',
                        'Renal transplant mass': 'In iliac fossa; assess for tenderness or bruit',
                        'Abdominal scars': 'Previous nephrectomy, transplant, or urological surgery',
                        'Ascites': 'Nephrotic syndrome or liver disease',
                        'Hepatosplenomegaly': 'Systemic disease causing renal involvement'
                    },
                    clinicalPearls: 'Large kidneys are ballotable bimanually; native kidneys rarely palpable unless enlarged'
                },
                'renal-angle-bladder': {
                    name: 'Renal Angle and Bladder',
                    technique: 'Percuss and palpate costo-vertebral angles for tenderness; percuss suprapubic area for bladder distension',
                    normal: 'No renal angle tenderness, non-distended bladder',
                    abnormal: {
                        'Renal angle tenderness': 'Pyelonephritis or perinephric abscess',
                        'Palpable bladder': 'Urinary retention, outlet obstruction, neurogenic bladder',
                        'Tender bladder': 'Cystitis or interstitial cystitis',
                        'Post-void fullness': 'Incomplete emptying in obstruction',
                        'Suprapubic masses': 'Bladder tumour or large fibroids compressing bladder'
                    },
                    clinicalPearls: 'Always consider measuring post-void residual with bladder scan if available'
                },
                'urinalysis-fluid': {
                    name: 'Urinalysis and Fluid Assessment',
                    technique: 'Dipstick for blood/protein/nitrites/glucose, check urine output, review fluid status and hydration',
                    normal: 'Clear urine, negative dipstick, adequate urine output',
                    abnormal: {
                        'Proteinuria/haematuria': 'Glomerulonephritis, stones, infection, malignancy',
                        'Nitrite/leukocyte positive': 'Urinary tract infection',
                        'Low output or anuria': 'AKI or obstruction',
                        'Foamy urine': 'Significant proteinuria',
                        'Dark concentrated urine': 'Dehydration or jaundice'
                    },
                    clinicalPearls: 'Send MSU for culture if infection suspected; quantify protein with ACR/PCR when indicated'
                }
            }
        },
        'male-genital-hernia': {
            title: 'Male Genital, Testicular, and Hernia Examination',
            category: 'primary_care',
            approach: 'Consent → Inspection → Palpation → Hernia assessment → Documentation',
            sections: {
                'consent-preparation': {
                    name: 'Consent and Preparation',
                    technique: 'Explain procedure, obtain consent, offer chaperone, ensure privacy and warmth, position standing then lying',
                    normal: 'Patient comfortable with chaperone present as required',
                    abnormal: {
                        'Anxiety or discomfort': 'May need to pause or re-explain',
                        'Inadequate exposure': 'Cannot fully assess genitalia or groins',
                        'Cultural considerations': 'Adjust approach respectfully',
                        'Pain preventing exam': 'Consider analgesia or deferring if acute',
                        'Absent chaperone': 'Documentation risk for intimate exam'
                    },
                    clinicalPearls: 'Always inspect and palpate with warm hands; document consent and chaperone details'
                },
                'inspection': {
                    name: 'Inspection',
                    technique: 'Inspect penis, scrotum, perineum, and groins for skin changes, swelling, scars, discharge',
                    normal: 'Normal external genitalia with no lesions or swelling',
                    abnormal: {
                        'Ulcers or warts': 'STIs such as HSV, syphilis, HPV',
                        'Phimosis/paraphimosis': 'Tight foreskin or trapped retracted foreskin',
                        'Hypospadias/epispadias': 'Abnormal urethral meatus position',
                        'Scrotal swelling': 'Hydrocele, varicocele, hernia, tumour',
                        'Groin scars': 'Previous hernia repair'
                    },
                    clinicalPearls: 'Inspect standing for hernias/varicoceles and lying for reducibility'
                },
                'scrotal-palpation': {
                    name: 'Scrotal Palpation',
                    technique: 'Palpate each testis, epididymis, and spermatic cord systematically; transilluminate swellings',
                    normal: 'Smooth, non-tender testes with identifiable epididymis and cord',
                    abnormal: {
                        'Hard, irregular mass': 'Suspect testicular tumour – urgent referral',
                        'Tender epididymis/testis': 'Epididymo-orchitis; consider torsion if acute',
                        'Transilluminating swelling': 'Hydrocele',
                        'Bag of worms cord': 'Varicocele (worse on standing/Valsalva)',
                        'Absent testis': 'Undescended or retracted testicle'
                    },
                    clinicalPearls: 'Torsion is a surgical emergency—sudden pain with high-riding testis needs urgent review'
                },
                'hernia-assessment': {
                    name: 'Hernia Assessment',
                    technique: 'Palpate deep and superficial inguinal rings, cough impulse, reduce hernia, assess femoral canal and complications',
                    normal: 'No cough impulse or palpable defect at inguinal or femoral rings',
                    abnormal: {
                        'Expansile cough impulse at inguinal ring': 'Inguinal hernia (direct/indirect)',
                        'Femoral hernia bulge': 'Below and lateral to pubic tubercle, higher risk of strangulation',
                        'Tender irreducible mass': 'Strangulated/obstructed hernia – urgent surgery',
                        'Recurrent hernia': 'Scar with new impulse',
                        'Cord thickening': 'Possible lipoma or funiculitis'
                    },
                    clinicalPearls: 'Examine standing and supine; ask patient to cough/strain. Document side, type, and reducibility'
                }
            }
        },
        'diabetic-foot': {
            title: 'Diabetic Foot Examination',
            category: 'specialized',
            approach: 'Inspection → Neurological → Vascular → Ulcer assessment → Risk stratification',
            sections: {
                'inspection': {
                    name: 'Inspection',
                    technique: 'Remove shoes and socks, inspect all surfaces including between toes',
                    normal: 'Normal skin, no calluses, no deformity, intact nails',
                    abnormal: {
                        'Ulceration': 'Neuropathic (painless) vs ischaemic (painful)',
                        'Charcot arthropathy': 'Swollen, deformed foot, "rocker-bottom"',
                        'Calluses': 'Pressure areas - risk for ulceration',
                        'Clawed toes': 'Neuropathy causing muscle imbalance',
                        'Infection': 'Cellulitis, abscess, osteomyelitis'
                    },
                    clinicalPearls: 'Always examine between toes. Note hygiene and footwear'
                },
                'neurological': {
                    name: 'Neurological Assessment',
                    technique: '10g monofilament testing, vibration (128Hz tuning fork), ankle reflexes',
                    normal: 'Intact sensation to monofilament, vibration sense present',
                    abnormal: {
                        'Loss of protective sensation': 'Cannot feel 10g monofilament - high risk',
                        'Absent vibration sense': 'Large fiber neuropathy',
                        'Absent ankle reflexes': 'Peripheral neuropathy',
                        'Glove-stocking distribution': 'Typical diabetic neuropathy pattern',
                        'Neuropathic ulcer': 'Painless, pressure areas, punched out'
                    },
                    clinicalPearls: 'Test multiple sites. Document which sites feel monofilament'
                },
                'vascular': {
                    name: 'Vascular Assessment',
                    technique: 'Palpate pulses (dorsalis pedis, posterior tibial), ABPI if available',
                    normal: 'Palpable foot pulses, warm feet, normal capillary refill',
                    abnormal: {
                        'Absent pulses': 'Peripheral arterial disease - urgent vascular assessment',
                        'Cold feet': 'Poor perfusion, critical ischaemia',
                        'Dependent rubor': 'Feet red when dependent, pale when elevated - severe PAD',
                        'Gangrene': 'Tissue necrosis - requires urgent intervention',
                        'ABPI <0.9': 'PAD present. <0.5 critical ischaemia'
                    },
                    clinicalPearls: 'Doppler if pulses not palpable. Calcified vessels may give falsely high ABPI'
                },
                'risk-stratification': {
                    name: 'Risk Stratification',
                    technique: 'Assess risk factors, categorize risk level, plan review frequency',
                    normal: 'Low risk - normal sensation and pulses',
                    abnormal: {
                        'High risk': 'Previous ulcer, amputation, neuropathy + PAD, on dialysis',
                        'Moderate risk': 'Neuropathy OR PAD alone, deformity, callus',
                        'Active ulceration': 'Urgent MDT assessment required',
                        'Charcot foot': 'High risk, needs urgent immobilization',
                        'Osteomyelitis': 'Probe to bone test positive, systemic infection'
                    },
                    clinicalPearls: 'Low risk: annual. Moderate: 3-6 monthly. High: 1-3 monthly review'
                }
            }
        },
        'newborn': {
            title: 'Newborn Examination',
            category: 'specialized',
            approach: 'General observation → Head to toe → Hips → Heart → Red reflex → Genitalia',
            sections: {
                'general-assessment': {
                    name: 'General Assessment',
                    technique: 'Observe color, tone, activity, breathing, feeding',
                    normal: 'Pink, active, good tone, regular breathing, feeding well',
                    abnormal: {
                        'Cyanosis': 'Central cyanosis - cardiac or respiratory pathology',
                        'Jaundice': 'Within 24h: pathological. Day 2-3: physiological',
                        'Poor tone': 'Floppy baby - neurological, genetic, metabolic',
                        'Respiratory distress': 'Grunting, tachypnea, recession - RDS, TTN, pneumonia',
                        'Not feeding': 'Infection, cardiac, neurological, metabolic'
                    },
                    clinicalPearls: 'Always examine in warm environment. APGAR scores at 1 and 5 minutes'
                },
                'cardiovascular': {
                    name: 'Cardiovascular Examination',
                    technique: 'Auscultate heart, palpate pulses (especially femoral), check for cyanosis',
                    normal: 'Normal heart sounds, palpable femoral pulses, pink peripheries',
                    abnormal: {
                        'Heart murmur': 'May be innocent or congenital heart disease',
                        'Absent femoral pulses': 'Coarctation of aorta - urgent echo',
                        'Cyanosis not responding to O2': 'Congenital cyanotic heart disease',
                        'Poor perfusion': 'Sepsis, cardiac failure, shock',
                        'Tachycardia >160': 'Sepsis, cardiac pathology, fever'
                    },
                    clinicalPearls: 'Most murmurs benign. If cyanotic or absent femorals, urgent cardiology'
                },
                'hip-examination': {
                    name: 'Hip Examination',
                    technique: 'Barlow and Ortolani maneuvers, check for leg length discrepancy, skin creases',
                    normal: 'Stable hips, symmetrical leg length and skin creases',
                    abnormal: {
                        'Ortolani positive': 'Clunk on abduction - dislocated hip relocating',
                        'Barlow positive': 'Hip dislocates on adduction and posterior pressure',
                        'Asymmetric skin creases': 'May indicate DDH - needs ultrasound',
                        'Limited abduction': 'DDH, infection, neurological',
                        'Leg length discrepancy': 'DDH, congenital short femur'
                    },
                    clinicalPearls: 'Risk factors: breech, family history, female. USS at 6 weeks if positive'
                },
                'red-reflex': {
                    name: 'Red Reflex Test',
                    technique: 'Ophthalmoscope at arm\'s length, check both eyes, look for symmetric red reflex',
                    normal: 'Symmetric red reflex in both eyes',
                    abnormal: {
                        'Absent red reflex': 'Cataract, retinoblastoma, retinal detachment',
                        'White reflex (leukocoria)': 'Retinoblastoma, cataract - urgent referral',
                        'Asymmetric reflex': 'Unilateral pathology, refractive error',
                        'Dull reflex': 'Media opacity, vitreous hemorrhage',
                        'Bilateral absence': 'Congenital cataracts - genetic/TORCH'
                    },
                    clinicalPearls: 'Do in darkened room. Refer urgently if absent or white reflex'
                }
            }
        },
        'paediatric-assessment': {
            title: 'Paediatric Examination (Infant/Child)',
            category: 'paediatrics',
            approach: 'General observation → Growth and vitals → Respiratory/cardiovascular → Abdomen/hydration → Neurological/development',
            sections: {
                'general-observation': {
                    name: 'General Observation',
                    technique: 'Observe interaction, level of alertness, colour, work of breathing, play or feeding behaviour',
                    normal: 'Alert or appropriately interactive, pink, comfortable breathing, consolable',
                    abnormal: {
                        'Lethargy or irritability': 'Possible sepsis, metabolic or neurological issue',
                        'Pallor or cyanosis': 'Anaemia or cardiorespiratory compromise',
                        'Stridor/grunting/recessions': 'Respiratory distress',
                        'Poor feeding/failure to thrive': 'Chronic illness or safeguarding concerns',
                        'Rash or petechiae': 'Infection or haematological disorder'
                    },
                    clinicalPearls: 'Use AVPU/GCS for consciousness; engage caregiver for history and comfort strategies'
                },
                'vitals-growth': {
                    name: 'Growth and Vital Signs',
                    technique: 'Measure weight, height/length, head circumference (infants), temperature, HR, RR, BP, oxygen saturation compared to age norms',
                    normal: 'Parameters within age-appropriate centiles and reference ranges',
                    abnormal: {
                        'Fever or hypothermia': 'Infection or sepsis risk especially <3 months',
                        'Tachycardia/tachypnoea': 'Pain, fever, dehydration, respiratory disease',
                        'Hypertension': 'Renal or endocrine pathology',
                        'Growth faltering': 'Nutritional deficiency, chronic disease, neglect',
                        'Micro/macrocephaly': 'Cranial growth disorders'
                    },
                    clinicalPearls: 'Plot on growth charts; use paediatric early warning scores to triage risk'
                },
                'respiratory-cardiovascular': {
                    name: 'Respiratory and Cardiovascular',
                    technique: 'Inspect chest movement, auscultate breath and heart sounds, palpate pulses (brachial/femoral), check capillary refill',
                    normal: 'Clear breath sounds, normal heart sounds without murmurs, palpable pulses with CRT <2s',
                    abnormal: {
                        'Wheeze/crackles': 'Asthma/bronchiolitis/pneumonia',
                        'Recessions or nasal flaring': 'Increased work of breathing',
                        'Murmur with poor pulses': 'Congenital heart disease',
                        'Prolonged CRT': 'Shock or dehydration',
                        'Unequal pulses or BP': 'Coarctation or vascular anomaly'
                    },
                    clinicalPearls: 'Count RR for full minute; femoral pulses critical in infants to exclude coarctation'
                },
                'abdomen-hydration': {
                    name: 'Abdomen and Hydration',
                    technique: 'Inspect for distension, hernias, surgical scars; palpate softly for organomegaly or masses; assess hydration (mucous membranes, skin turgor, urine output)',
                    normal: 'Soft, non-tender abdomen with no organomegaly; moist mucosa and adequate hydration',
                    abnormal: {
                        'Abdominal distension': 'Obstruction, constipation, ascites',
                        'Hepatosplenomegaly': 'Infection, haemolysis, metabolic or oncological causes',
                        'Palpable mass': 'Nephroblastoma, neuroblastoma, faecal loading',
                        'Sunken eyes/dry mucosa': 'Dehydration',
                        'Umbilical/inguinal hernia': 'May need surgical review if incarcerated'
                    },
                    clinicalPearls: 'Examine last if the child is anxious; watch the child climb onto bed for functional clues'
                },
                'neuro-development': {
                    name: 'Neurological and Developmental',
                    technique: 'Assess tone, power, reflexes (including primitive in infants), gait, coordination; review developmental milestones and speech',
                    normal: 'Age-appropriate tone and milestones with steady gait in ambulant children',
                    abnormal: {
                        'Hyper/hypotonia': 'Cerebral palsy, neuromuscular disorders',
                        'Delayed milestones or regression': 'Developmental disorder or metabolic disease',
                        'Abnormal gait': 'Ataxia, hemiplegia, or musculoskeletal issue',
                        'Bulging fontanelle': 'Raised ICP in infants',
                        'Seizure activity': 'Needs urgent evaluation'
                    },
                    clinicalPearls: 'Use age-specific developmental questionnaires; observe play for coordination and social interaction'
                }
            }
        },
        'atls-primary-survey': {
            title: 'ATLS Primary Survey',
            category: 'emergency',
            approach: 'ABCDE → Identify life-threats → Treat as found → Re-assess constantly',
            sections: {
                'airway': {
                    name: 'Airway with C-spine Control',
                    technique: 'Check patency, look for obstruction, protect cervical spine',
                    normal: 'Patent airway, speaking clearly, normal breathing',
                    abnormal: {
                        'Obstruction': 'Snoring, gurgling, stridor - chin lift, jaw thrust',
                        'Foreign body': 'Back blows, Heimlich, direct laryngoscopy',
                        'Facial trauma': 'Bleeding, broken teeth, maxillofacial fractures',
                        'Burns': 'Singed nasal hairs, soot in mouth - early intubation',
                        'Unconscious': 'Cannot protect airway - secure immediately'
                    },
                    clinicalPearls: 'C-spine immobilization until cleared. If in doubt, intubate'
                },
                'breathing': {
                    name: 'Breathing and Ventilation',
                    technique: 'Exposure, inspection, palpation, percussion, auscultation, SpO2',
                    normal: 'Regular breathing, symmetrical chest movement, clear lung fields',
                    abnormal: {
                        'Tension pneumothorax': 'Deviated trachea, absent sounds - needle decompression',
                        'Flail chest': 'Paradoxical movement - analgesia, consider intubation',
                        'Open pneumothorax': 'Sucking chest wound - 3-sided dressing',
                        'Haemothorax': 'Dull percussion, shock - chest drain',
                        'Respiratory distress': 'RR >30, SpO2 <90% - high flow O2'
                    },
                    clinicalPearls: 'Immediately life-threatening: tension PTX, open PTX, flail, massive hemothorax'
                },
                'circulation': {
                    name: 'Circulation with Hemorrhage Control',
                    technique: 'Pulses, BP, capillary refill, control external bleeding',
                    normal: 'Strong central pulses, BP >90 systolic, warm peripheries',
                    abnormal: {
                        'Shock': 'Weak pulses, low BP, prolonged CRT - fluid resuscitation',
                        'External bleeding': 'Direct pressure, tourniquet if limb',
                        'Internal bleeding': 'Chest, abdomen, pelvis, long bones - transfuse',
                        'Cardiac tamponade': 'Beck triad, JVP raised - pericardiocentesis',
                        'Massive transfusion': '1:1:1 ratio RBC:FFP:platelets'
                    },
                    clinicalPearls: 'Permissive hypotension until bleeding controlled. Tranexamic acid early'
                },
                'disability': {
                    name: 'Disability (Neurological)',
                    technique: 'GCS, pupils, glucose, posturing, limb movements',
                    normal: 'GCS 15, equal reactive pupils, normal glucose, moving all limbs',
                    abnormal: {
                        'GCS <8': 'Severe head injury - intubate for airway protection',
                        'Unequal pupils': 'Raised ICP, herniation - urgent CT, neurosurgery',
                        'Hypoglycemia': 'Glucose <4mmol - IV dextrose immediately',
                        'Posturing': 'Decorticate, decerebrate - severe brain injury',
                        'Focal neurology': 'Stroke, spinal cord injury, peripheral nerve'
                    },
                    clinicalPearls: 'AVPU or GCS. Check glucose always. CT head if GCS <15'
                },
                'exposure': {
                    name: 'Exposure and Environment',
                    technique: 'Fully expose patient, log roll, warm environment, temperature',
                    normal: 'No additional injuries, normothermic',
                    abnormal: {
                        'Hypothermia': 'Trauma triad of death - warm actively',
                        'Hidden injuries': 'Back, perineum, scalp - log roll to examine',
                        'Burns': 'Extent (rule of 9s), depth, circumferential',
                        'Pelvic instability': 'Do not spring pelvis - unstable fracture',
                        'Penetrating trauma': 'Entry and exit wounds, retained objects'
                    },
                    clinicalPearls: 'Prevent hypothermia - warm fluids, blankets, room temperature. Log roll with C-spine'
                }
            }
        },
        'gynae': {
            title: 'Gynaecological Examination',
            category: 'primary_care',
            approach: 'Consent → Positioning → Inspection → Speculum → Bimanual → Documentation',
            sections: {
                'consent-preparation': {
                    name: 'Consent and Preparation',
                    technique: 'Explain procedure, obtain consent, chaperone present, correct positioning',
                    normal: 'Patient consented, comfortable, appropriately positioned',
                    abnormal: {
                        'Inadequate consent': 'Patient not fully informed of procedure',
                        'No chaperone': 'Required for intimate examinations',
                        'Patient anxiety': 'Excessive worry, previous trauma',
                        'Positioning difficulties': 'Mobility issues, pain',
                        'Cultural concerns': 'Religious objections, modesty issues'
                    },
                    clinicalPearls: 'Always offer chaperone. Explain each step. Stop if patient requests'
                },
                'external-inspection': {
                    name: 'External Inspection',
                    technique: 'Inspect vulva, perineum, anus for abnormalities',
                    normal: 'Normal vulval anatomy, no lesions, normal hair distribution',
                    abnormal: {
                        'Vulval lesions': 'Ulcers, warts, tumours, inflammatory conditions',
                        'Discharge': 'Abnormal colour, consistency, odour',
                        'Prolapse': 'Cystocoele, rectocoele, uterine prolapse',
                        'Atrophic changes': 'Post-menopausal atrophy, dryness',
                        'Trauma': 'Tears, bruising, signs of abuse'
                    },
                    clinicalPearls: 'Good lighting essential. Note any asymmetry or obvious pathology'
                },
                'speculum-examination': {
                    name: 'Speculum Examination',
                    technique: 'Insert appropriate speculum, visualize cervix, take samples if needed',
                    normal: 'Normal cervix, no discharge, appropriate cervical os',
                    abnormal: {
                        'Cervical abnormalities': 'Erosion, polyps, suspicious lesions',
                        'Abnormal discharge': 'Purulent, offensive, blood-stained',
                        'Bleeding': 'Contact bleeding, intermenstrual bleeding',
                        'Cervical motion tenderness': 'Pain on moving cervix - PID',
                        'Uterine prolapse': 'Cervix visible at introitus'
                    },
                    clinicalPearls: 'Warm speculum. Insert at 45° angle. Cervical screening if due'
                },
                'bimanual-examination': {
                    name: 'Bimanual Examination',
                    technique: 'Two fingers in vagina, other hand on abdomen, assess uterus and adnexae',
                    normal: 'Normal sized, mobile uterus, no adnexal masses',
                    abnormal: {
                        'Enlarged uterus': 'Pregnancy, fibroids, malignancy',
                        'Fixed uterus': 'Endometriosis, malignancy, adhesions',
                        'Adnexal masses': 'Ovarian cysts, tumours, ectopic pregnancy',
                        'Tenderness': 'PID, ovarian pathology, endometriosis',
                        'Irregular contour': 'Fibroids, malignancy'
                    },
                    clinicalPearls: 'Gentle technique. Warn patient before examination. Note any masses'
                }
            }
        },
        'hypertension-review': {
            title: 'Hypertension Review',
            category: 'primary_care',
            approach: 'Blood pressure → Complications → Medication review → Lifestyle → Target organs',
            sections: {
                'bp-measurement': {
                    name: 'Blood Pressure Measurement',
                    technique: 'Correct cuff size, patient seated 5 minutes, repeat if abnormal',
                    normal: '<140/90 mmHg, <135/85 home monitoring',
                    abnormal: {
                        'Stage 1 HTN': '140-159/90-99 - ABPM/HBPM for diagnosis',
                        'Stage 2 HTN': '160-179/100-109 - treat if confirmed',
                        'Stage 3 HTN': '≥180/110 - urgent treatment',
                        'Postural drop': '>20 mmHg fall - review medications',
                        'White coat HTN': 'Clinic BP high, home normal - consider ABPM'
                    },
                    clinicalPearls: 'NICE recommends ABPM or HBPM for diagnosis. Average multiple readings'
                },
                'complications': {
                    name: 'Complication Screening',
                    technique: 'CVS exam, fundoscopy, renal function, urine dip, foot pulses',
                    normal: 'No end organ damage',
                    abnormal: {
                        'Hypertensive retinopathy': 'AV nipping, hemorrhages, exudates, papilledema',
                        'LVH': 'Displaced apex, loud S4 - ECG/echo confirmation',
                        'Renal impairment': 'Raised creatinine, proteinuria - target organ damage',
                        'PAD': 'Absent pedal pulses, claudication',
                        'Stroke/TIA': 'Previous cardiovascular events'
                    },
                    clinicalPearls: 'Annual check: BP, bloods (U&E, lipids, HbA1c), urine ACR, CVD risk'
                },
                'medication-review': {
                    name: 'Medication Review',
                    technique: 'Check adherence, side effects, effectiveness, drug interactions',
                    normal: 'BP at target on current medications, good adherence',
                    abnormal: {
                        'Poor adherence': 'Non-compliance - explore barriers',
                        'Side effects': 'Cough (ACEi), ankle swelling (CCB), dizziness',
                        'Inadequate control': 'Not at target - consider adding agent',
                        'Resistant HTN': '≥3 drugs including diuretic - specialist referral',
                        'Drug interactions': 'NSAIDs, contraceptive pill, steroids'
                    },
                    clinicalPearls: 'NICE algorithm: ACEi/ARB → add CCB → add thiazide → specialist'
                },
                'lifestyle': {
                    name: 'Lifestyle Management',
                    technique: 'Diet, exercise, alcohol, smoking, weight, stress',
                    normal: 'Annual check for normal BP',
                    abnormal: {
                        'Newly diagnosed hypertension': 'Assess cardiovascular risk, consider treatment',
                        'Uncontrolled hypertension': 'Review medications, lifestyle advice',
                        'Resistant hypertension': 'Consider specialist referral',
                        'Secondary hypertension': 'Young age, severe/resistant - investigate causes',
                        'Accelerated hypertension': 'Papilloedema, AKI - emergency treatment'
                    },
                    clinicalPearls: 'QRisk3 calculator for cardiovascular risk assessment'
                }
            }
        },
        'gynaecological': {
            title: 'Gynaecological Examination',
            category: 'primary_care',
            approach: 'Consent → Positioning → Inspection → Speculum → Bimanual → Documentation',
            sections: {
                'consent-preparation': {
                    name: 'Consent and Preparation',
                    technique: 'Explain procedure, obtain consent, chaperone present, correct positioning',
                    normal: 'Patient consented, comfortable, appropriately positioned',
                    abnormal: {
                        'Inadequate consent': 'Patient not fully informed of procedure',
                        'No chaperone': 'Required for intimate examinations',
                        'Patient anxiety': 'Excessive worry, previous trauma',
                        'Positioning difficulties': 'Mobility issues, pain',
                        'Cultural concerns': 'Religious objections, modesty issues'
                    },
                    clinicalPearls: 'Always offer chaperone. Explain each step. Stop if patient requests'
                },
                'external-inspection': {
                    name: 'External Inspection',
                    technique: 'Inspect vulva, perineum, anus for abnormalities',
                    normal: 'Normal vulval anatomy, no lesions, normal hair distribution',
                    abnormal: {
                        'Vulval lesions': 'Ulcers, warts, tumours, inflammatory conditions',
                        'Discharge': 'Abnormal colour, consistency, odour',
                        'Prolapse': 'Cystocoele, rectocoele, uterine prolapse',
                        'Atrophic changes': 'Post-menopausal atrophy, dryness',
                        'Trauma': 'Tears, bruising, signs of abuse'
                    },
                    clinicalPearls: 'Good lighting essential. Note any asymmetry or obvious pathology'
                },
                'speculum-examination': {
                    name: 'Speculum Examination',
                    technique: 'Insert appropriate speculum, visualize cervix, take samples if needed',
                    normal: 'Normal cervix, no discharge, appropriate cervical os',
                    abnormal: {
                        'Cervical abnormalities': 'Erosion, polyps, suspicious lesions',
                        'Abnormal discharge': 'Purulent, offensive, blood-stained',
                        'Bleeding': 'Contact bleeding, intermenstrual bleeding',
                        'Cervical motion tenderness': 'Pain on moving cervix - PID',
                        'Uterine prolapse': 'Cervix visible at introitus'
                    },
                    clinicalPearls: 'Warm speculum. Insert at 45° angle. Cervical screening if due'
                },
                'bimanual-examination': {
                    name: 'Bimanual Examination',
                    technique: 'Two fingers in vagina, other hand on abdomen, assess uterus and adnexae',
                    normal: 'Normal sized, mobile uterus, no adnexal masses',
                    abnormal: {
                        'Enlarged uterus': 'Pregnancy, fibroids, malignancy',
                        'Fixed uterus': 'Endometriosis, malignancy, adhesions',
                        'Adnexal masses': 'Ovarian cysts, tumours, ectopic pregnancy',
                        'Tenderness': 'PID, ovarian pathology, endometriosis',
                        'Irregular contour': 'Fibroids, malignancy'
                    },
                    clinicalPearls: 'Gentle technique. Warn patient before examination. Note any masses'
                }
            }
        },
        'antenatal-assessment': {
            title: 'Antenatal Obstetric Assessment',
            category: 'obstetrics',
            approach: 'Introduction → Maternal observations → Abdominal assessment (SFH/lie/presentation) → Fetal wellbeing → Education and safety-netting',
            sections: {
                'maternal-observations': {
                    name: 'Maternal Observations and History',
                    technique: 'Check BP, pulse, temperature, BMI/weight gain; review symptoms (reduced movements, headaches, visual disturbance, bleeding, contractions)',
                    normal: 'Normotensive, afebrile, feeling well with no concerning symptoms',
                    abnormal: {
                        'Hypertension/proteinuria': 'Consider pre-eclampsia; check reflexes and arrange labs',
                        'Headache/visual symptoms': 'Possible pre-eclampsia warning signs',
                        'Vaginal bleeding': 'Placental issues or cervical causes',
                        'Regular painful contractions': 'Possible labour',
                        'Itching with jaundice': 'Consider obstetric cholestasis'
                    },
                    clinicalPearls: 'Always dip urine for protein; review antenatal chart for trends and risk factors'
                },
                'abdominal-assessment': {
                    name: 'Abdominal Assessment',
                    technique: 'Inspect size and shape, palpate fundal height (tape measure), determine lie/presentation/engagement, auscultate fetal heart if indicated',
                    normal: 'Symphysio-fundal height within ±2cm of gestational weeks, cephalic longitudinal lie, engaged after 37 weeks',
                    abnormal: {
                        'Size < dates': 'Fetal growth restriction or oligohydramnios',
                        'Size > dates': 'Polyhydramnios, macrosomia, multiple pregnancy',
                        'Breech/transverse lie': 'Consider ECV or delivery planning',
                        'Non-engaged head at term': 'Possibility of malpresentation or cephalopelvic disproportion',
                        'Fundal tenderness': 'Abruption or infection'
                    },
                    clinicalPearls: 'Ensure empty bladder before measuring; use both hands for Leopold manoeuvres'
                },
                'fetal-wellbeing': {
                    name: 'Fetal Wellbeing',
                    technique: 'Confirm fetal movements, auscultate fetal heart with Doppler (110-160 bpm), assess pattern; review CTG if available',
                    normal: 'Reported good fetal movements with fetal heart 110-160 bpm and no decelerations',
                    abnormal: {
                        'Reduced or absent movements': 'Urgent CTG and obstetric review',
                        'Abnormal heart rate': 'Tachycardia, bradycardia, or variable decelerations',
                        'Meconium-stained liquor leaking': 'Potential fetal compromise',
                        'Absent heart tones': 'Confirm with ultrasound urgently',
                        'Oligohydramnios/polyhydramnios signs': 'Requires specialist review'
                    },
                    clinicalPearls: 'If unsure of heart rate, check maternal pulse to avoid confusion; escalate reduced movements immediately'
                },
                'education-safetynetting': {
                    name: 'Education and Safety-Netting',
                    technique: 'Discuss kick counts, warning signs (bleeding, fluid loss, headache, vision changes), birth plan, vaccinations and screening',
                    normal: 'Patient understands when and where to seek help, follow-up arranged',
                    abnormal: {
                        'Unclear plan': 'No follow-up or confusion about place of care',
                        'Declined essential screening': 'Document and revisit counselling',
                        'Psychosocial concerns': 'Safeguarding or mental health needs support',
                        'Non-attendance to clinic': 'Risk of missed complications',
                        'Medication non-adherence': 'E.g., aspirin for pre-eclampsia prophylaxis'
                    },
                    clinicalPearls: 'Provide written information and emergency contact numbers; tailor advice to gestation and risk factors'
                }
            }
        },
        'postnatal-review': {
            title: 'Postnatal Maternal Assessment',
            category: 'obstetrics',
            approach: 'Introduction → Observations → Uterine assessment → Lochia → Perineum/Caesarean wound → Breasts/feeding → Mental health → Safety-netting',
            sections: {
                'observations': {
                    name: 'Observations & General Wellbeing',
                    technique: 'Assess vital signs, pain scores, overall appearance, ability to mobilise',
                    normal: 'Afebrile, normotensive, comfortable at rest, mobilising independently',
                    abnormal: {
                        'Pyrexia (>38°C)': 'Consider endometritis, wound infection, mastitis',
                        'Tachycardia/hypotension': 'May signal ongoing haemorrhage or sepsis',
                        'Breathlessness or chest pain': 'Consider pulmonary embolism',
                        'Severe pain or inability to mobilise': 'Complication requiring review'
                    },
                    clinicalPearls: 'Ask about urinary/bowel function, thromboembolism prophylaxis adherence'
                },
                'uterus-involution': {
                    name: 'Uterine Involution',
                    technique: 'Palpate fundal height and tone, assess for tenderness',
                    normal: 'Fundus firm, midline, at or below umbilicus by day 2-3 postpartum',
                    abnormal: {
                        'Boggy uterus': 'Suggests uterine atony and risk of haemorrhage',
                        'Delayed involution': 'Consider retained products or infection',
                        'Marked tenderness': 'May indicate endometritis or haematoma'
                    },
                    clinicalPearls: 'Encourage breastfeeding and bladder emptying to promote uterine tone'
                },
                'lochia-assessment': {
                    name: 'Lochia Assessment',
                    technique: 'Ask about amount, colour, odour of vaginal loss',
                    normal: 'Lochia rubra first few days → serosa (pink/brown) by day 4-10 → alba (yellow/white) by week 3-6',
                    abnormal: {
                        'Heavy fresh bleeding with clots': 'Postpartum haemorrhage, retained products',
                        'Offensive odour': 'Endometritis',
                        'Sudden return to bright red bleeding': 'Overexertion or retained products'
                    },
                    clinicalPearls: 'Quantify pad use, advise patient to seek care if bleeding soaks >1 pad/hour'
                },
                'perineum-wound': {
                    name: 'Perineum / Caesarean Wound',
                    technique: 'Inspect perineal sutures or abdominal wound for healing, erythema, discharge',
                    normal: 'Edges approximated, minimal swelling, no discharge or dehiscence',
                    abnormal: {
                        'Redness, warmth, purulent discharge': 'Wound infection',
                        'Gapping of wound': 'Wound dehiscence – urgent surgical review',
                        'Hematoma': 'Painful swelling, may require drainage',
                        'Severe perineal pain': 'Consider infection or breakdown of repair'
                    },
                    clinicalPearls: 'Assess analgesia needs, pelvic floor exercises, offer referral for continence support if required'
                },
                'breastfeeding-support': {
                    name: 'Breast & Feeding Support',
                    technique: 'Observe latch if breastfeeding, inspect breasts for engorgement or mastitis, ask about feeding plan',
                    normal: 'Breasts soft or mildly engorged, nipples intact, effective latch, baby feeding 8-12 times/day',
                    abnormal: {
                        'Cracked/bleeding nipples': 'Poor latch or infection',
                        'Localized breast redness + fever': 'Mastitis – needs prompt treatment',
                        'Insufficient milk transfer': 'Consider lactation support',
                        'Formula feeding difficulties': 'Address equipment, feeding schedule, support needs'
                    },
                    clinicalPearls: 'Signpost to lactation consultant, provide safe feeding advice, check vitamin D supplementation'
                },
                'mental-health': {
                    name: 'Mental Health & Safeguarding',
                    technique: 'Use open questions to explore mood, anxiety, bonding, support network, domestic safety',
                    normal: 'Positive mood, normal emotional lability, adequate support, no safeguarding concerns',
                    abnormal: {
                        'Persistent low mood, anhedonia': 'Postnatal depression – consider EPDS screening',
                        'Intrusive thoughts/obsessions': 'Postnatal OCD or anxiety',
                        'Red flag symptoms': 'Thoughts of self-harm or harm to baby, psychosis – emergency referral',
                        'Safeguarding concerns': 'Domestic abuse, substance misuse, housing insecurity'
                    },
                    clinicalPearls: 'Provide perinatal mental health resources, ensure follow-up, involve health visitor'
                },
                'safety-netting': {
                    name: 'Safety Netting & Follow-up',
                    technique: 'Discuss warning signs, contraception, immunisations, schedule routine postnatal checks',
                    normal: 'Patient understands red flags and follow-up plan, contraception discussed, immunisations up to date',
                    abnormal: {
                        'No understanding of red flags': 'Reiterate education, provide written information',
                        'Unaddressed contraception needs': 'Offer immediate options including LARC',
                        'Outstanding clinical issues': 'Arrange GP or specialist review'
                    },
                    clinicalPearls: 'Document all advice, provide contact numbers, coordinate care with primary/community teams'
                }
            }
        }
    };


// Export helper functions
export function searchExaminations(query) {
    const results = [];
    const searchTerm = query.toLowerCase();
    
    Object.keys(examinationGuides).forEach(key => {
        const exam = examinationGuides[key];
        if (exam.title.toLowerCase().includes(searchTerm) || 
            exam.category.toLowerCase().includes(searchTerm)) {
            results.push({ key, ...exam });
        }
        
        // Search within sections
        if (exam.sections) {
            Object.keys(exam.sections).forEach(sectionKey => {
                const section = exam.sections[sectionKey];
                if (section.name.toLowerCase().includes(searchTerm) ||
                    section.technique.toLowerCase().includes(searchTerm)) {
                    results.push({ 
                        key,
                        section: sectionKey, 
                        parentTitle: exam.title,
                        ...section 
                    });
                }
            });
        }
    });
    
    return results;
}

export function getExaminationsByCategory(category) {
    return Object.keys(examinationGuides)
        .filter(key => examinationGuides[key].category === category)
        .map(key => ({ key, ...examinationGuides[key] }));
}

export function getAllCategories() {
    const categories = new Set();
    Object.values(examinationGuides).forEach(exam => {
        categories.add(exam.category);
    });
    return Array.from(categories).sort();
}
