/**
 * Differential Diagnosis Database
 * Extracted from V1 for V2 independence
 * Contains comprehensive differential diagnoses for common presenting complaints
 */

export const differentialDatabase =         {
            'chest-pain': {
                title: 'Chest Pain',
                category: 'Cardiovascular/Pulmonary',
                redFlags: '🚩 Sudden onset, severe pain, radiation to back/jaw, diaphoresis, hypotension, syncope',
                presentations: {
                    'Acute coronary syndrome': {
                        features: 'Crushing, substernal, radiates to left arm/jaw, diaphoresis, dyspnea, nausea. Risk factors: age, DM, HTN, smoking, family history',
                        tests: 'ECG (ST changes, Q waves), troponins (peak 12-24h), CXR, echo if available',
                        urgency: 'Emergency',
                        timeToTreat: '90 minutes door-to-balloon for STEMI',
                        clinicalPearls: 'Women may present atypically (fatigue, nausea). Troponins can be elevated in kidney disease',
                        differentiatingFeatures: 'Chest pressure >20min, not positional, not reproduced by palpation'
                    },
                    'Pulmonary embolism': {
                        features: 'Sudden onset, pleuritic, dyspnea, tachycardia. Risk factors: immobilization, surgery, malignancy, OCP, DVT',
                        tests: 'Wells score, D-dimer (if low risk), CTPA, V/Q scan, echo (RV strain)',
                        urgency: 'Emergency',
                        timeToTreat: 'Anticoagulation within hours if high suspicion',
                        clinicalPearls: 'Wells score >4 = high risk. Normal D-dimer rules out PE if low risk. Tachycardia most common sign',
                        differentiatingFeatures: 'Sudden onset, associated dyspnea, risk factors for VTE'
                    },
                    'Pneumothorax': {
                        features: 'Sudden onset, sharp, pleuritic, dyspnea. Risk factors: tall, thin, young males, COPD, trauma',
                        tests: 'CXR (upright, expiratory), CT chest if small pneumothorax suspected',
                        urgency: 'Urgent',
                        timeToTreat: 'Immediate chest tube if tension pneumothorax',
                        clinicalPearls: 'May be missed on supine CXR. Tension pneumothorax causes hemodynamic compromise',
                        differentiatingFeatures: 'Decreased breath sounds, hyperresonance to percussion'
                    },
                    'Aortic dissection': {
                        features: 'Tearing, severe, radiates to back, pulse deficits, HTN. Risk factors: HTN, Marfan, bicuspid valve',
                        tests: 'CTA chest (preferred), TEE, MRI. ECG to rule out MI',
                        urgency: 'Emergency',
                        timeToTreat: 'Emergency surgery for Type A, medical management for Type B',
                        clinicalPearls: 'Type A involves ascending aorta, Type B does not. Blood pressure differential >20mmHg between arms',
                        differentiatingFeatures: 'Maximal intensity at onset, tearing quality, back radiation'
                    },
                    'GERD': {
                        features: 'Burning, retrosternal, postprandial, positional, antacid relief. Triggers: spicy foods, caffeine, alcohol',
                        tests: 'Clinical diagnosis, PPI trial, EGD if alarming features (dysphagia, weight loss, GI bleeding)',
                        urgency: 'Non-urgent',
                        timeToTreat: 'PPI trial 4-8 weeks',
                        clinicalPearls: 'Can mimic angina. Barrett esophagus risk with chronic GERD. H. pylori testing if refractory',
                        differentiatingFeatures: 'Relationship to meals, positional, responds to antacids'
                    },
                    'Costochondritis': {
                        features: 'Sharp, localized, reproducible with palpation, worse with movement/deep inspiration',
                        tests: 'Clinical diagnosis, rule out cardiac causes if risk factors present',
                        urgency: 'Non-urgent',
                        timeToTreat: 'NSAIDs, heat/ice therapy',
                        clinicalPearls: 'Diagnosis of exclusion. Tietze syndrome involves swelling of costal cartilage',
                        differentiatingFeatures: 'Reproducible with palpation, sharp quality, chest wall tenderness'
                    },
                    'Anxiety/Panic attack': {
                        features: 'Sudden onset, sharp/stabbing, palpitations, diaphoresis, sense of doom, hyperventilation',
                        tests: 'Rule out organic causes first, especially in older patients or those with risk factors',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Reassurance, breathing exercises, consider anxiolytics',
                        clinicalPearls: 'Peak symptoms within 10 minutes. Often recurrent. Associated with agoraphobia',
                        differentiatingFeatures: 'Young patient, recurrent episodes, associated anxiety symptoms'
                    }
                }
            },
            'shortness-of-breath': {
                title: 'Shortness of Breath (Dyspnea)',
                category: 'Pulmonary/Cardiovascular',
                redFlags: '🚩 Stridor, tripod positioning, inability to speak, cyanosis, altered mental status',
                presentations: {
                    'Heart failure': {
                        features: 'Exertional dyspnea, orthopnea, PND, bilateral ankle edema, JVD, S3 gallop. History of CAD, HTN, DM',
                        tests: 'BNP/NT-proBNP (>400 pg/mL), echo (EF, wall motion), CXR (pulmonary edema), ECG',
                        urgency: 'Urgent',
                        timeToTreat: 'Diuretics, ACE-I, beta-blockers per guidelines',
                        clinicalPearls: 'BNP <100 rules out HF. Preserved vs reduced EF affects treatment. Check for precipitants',
                        differentiatingFeatures: 'Orthopnea, PND, bilateral edema, elevated JVP'
                    },
                    'Asthma exacerbation': {
                        features: 'Wheezing, cough, chest tightness, trigger exposure (allergens, URI, exercise), personal/family history',
                        tests: 'Peak flow (<50% predicted = severe), ABG if severe, CXR to rule out pneumothorax',
                        urgency: 'Urgent',
                        timeToTreat: 'Beta-agonists, steroids, escalate based on severity',
                        clinicalPearls: 'Silent chest = severe. Peak flow may be unreliable in severe cases. Consider vocal cord dysfunction',
                        differentiatingFeatures: 'Expiratory wheeze, response to bronchodilators, known triggers'
                    },
                    'COPD exacerbation': {
                        features: 'Increased dyspnea, cough, sputum production (purulent), smoking history, barrel chest, prolonged expiration',
                        tests: 'ABG (CO2 retention), CXR (hyperinflation), sputum culture, CBC',
                        urgency: 'Urgent',
                        timeToTreat: 'Bronchodilators, steroids, antibiotics if purulent sputum',
                        clinicalPearls: 'Watch for CO2 retention with O2 therapy. NIV may avoid intubation. Check for precipitants',
                        differentiatingFeatures: 'Smoking history, chronic productive cough, barrel chest'
                    },
                    'Pneumonia': {
                        features: 'Fever, cough, purulent sputum, pleuritic chest pain, rales, dullness to percussion',
                        tests: 'CXR (infiltrate), CBC (leukocytosis), blood cultures, sputum culture, procalcitonin',
                        urgency: 'Urgent',
                        timeToTreat: 'Antibiotics within 4-6 hours, based on community vs hospital acquired',
                        clinicalPearls: 'CURB-65 score for severity. Atypical organisms in young patients. Check for complications',
                        differentiatingFeatures: 'Fever, productive cough, focal findings on exam and CXR'
                    },
                    'Pulmonary embolism': {
                        features: 'Sudden onset, pleuritic chest pain, tachycardia, risk factors for VTE',
                        tests: 'Wells score, D-dimer, CTPA, V/Q scan, echo (RV dysfunction)',
                        urgency: 'Emergency',
                        timeToTreat: 'Anticoagulation immediately if high suspicion',
                        clinicalPearls: 'May present with isolated dyspnea. Hampton hump and Westermark sign on CXR rare',
                        differentiatingFeatures: 'Sudden onset, VTE risk factors, clear lungs on exam'
                    },
                    'Anxiety/Hyperventilation': {
                        features: 'Acute onset, perioral numbness, carpopedal spasm, palpitations, sense of doom',
                        tests: 'Rule out organic causes, ABG (respiratory alkalosis), basic metabolic panel',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Reassurance, breathing exercises, paper bag rebreathing',
                        clinicalPearls: 'Often in young patients. May have history of panic attacks. Exclude underlying disease first',
                        differentiatingFeatures: 'Young patient, associated anxiety, perioral numbness'
                    }
                }
            },
            'abdominal-pain': {
                title: 'Abdominal Pain',
                category: 'Gastroenterology/Surgery',
                redFlags: '🚩 Hemodynamic instability, peritoneal signs, severe persistent pain, vomiting blood',
                presentations: {
                    'Appendicitis': {
                        features: 'Periumbilical pain → RLQ, fever, nausea, vomiting, McBurney point tenderness, psoas/obturator signs',
                        tests: 'CT abdomen/pelvis (preferred), ultrasound (children/pregnancy), CBC (leukocytosis), urinalysis',
                        urgency: 'Emergency',
                        timeToTreat: 'Surgery within 12-24 hours, antibiotics if perforated',
                        clinicalPearls: 'Alvarado score for risk stratification. Atypical presentation in elderly, pregnant. Perforation risk increases with time',
                        differentiatingFeatures: 'Migration of pain to RLQ, rebound tenderness, fever'
                    },
                    'Cholecystitis': {
                        features: 'RUQ pain, Murphy sign, fat intolerance, fever, nausea. Risk factors: 4 Fs (fat, female, forty, fertile)',
                        tests: 'Ultrasound (gallstones, wall thickening), HIDA scan if unclear, LFTs, lipase',
                        urgency: 'Urgent',
                        timeToTreat: 'Cholecystectomy within 72 hours, antibiotics if complicated',
                        clinicalPearls: 'Murphy sign more specific than ultrasound findings. Emphysematous cholecystitis in diabetics',
                        differentiatingFeatures: 'RUQ pain, positive Murphy sign, gallstones on imaging'
                    },
                    'Pancreatitis': {
                        features: 'Epigastric pain radiating to back, nausea, vomiting. Triggers: alcohol, gallstones, hypertriglyceridemia',
                        tests: 'Lipase (>3× normal), amylase, CT abdomen if severe, LFTs, triglycerides',
                        urgency: 'Urgent',
                        timeToTreat: 'Supportive care, pain control, IV fluids, NPO',
                        clinicalPearls: 'Ranson criteria for severity. ERCP if gallstone pancreatitis. Watch for complications (pseudocyst, necrosis)',
                        differentiatingFeatures: 'Epigastric pain radiating to back, elevated lipase'
                    },
                    'Bowel obstruction': {
                        features: 'Crampy pain, nausea, vomiting, distension, constipation, high-pitched bowel sounds or silence',
                        tests: 'CT abdomen/pelvis (transition point), abdominal X-ray (dilated loops), CBC, BMP',
                        urgency: 'Emergency',
                        timeToTreat: 'NGT decompression, IV fluids, surgery if complete obstruction',
                        clinicalPearls: 'Small bowel: crampy, early vomiting. Large bowel: distension, late vomiting. Strangulation risk',
                        differentiatingFeatures: 'Crampy pain, vomiting, distension, abnormal bowel sounds'
                    },
                    'Diverticulitis': {
                        features: 'LLQ pain (Western), fever, change in bowel habits, tender mass. More common in elderly',
                        tests: 'CT abdomen/pelvis (wall thickening, fat stranding), CBC, CRP',
                        urgency: 'Urgent',
                        timeToTreat: 'Antibiotics (ciprofloxacin + metronidazole), bowel rest',
                        clinicalPearls: 'Avoid colonoscopy in acute phase. Hinchey classification for severity. Consider complications',
                        differentiatingFeatures: 'LLQ pain, older patient, known diverticulosis'
                    },
                    'Gastroenteritis': {
                        features: 'Crampy pain, diarrhea, nausea, vomiting, fever. Food/water exposure, contacts with similar illness',
                        tests: 'Clinical diagnosis, stool studies if severe/bloody, CBC if dehydrated',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Supportive care, hydration, probiotics',
                        clinicalPearls: 'Usually self-limited. Antibiotics only if bacterial and severe. Watch for dehydration',
                        differentiatingFeatures: 'Diarrhea predominant, food/water exposure, multiple affected individuals'
                    },
                    'Peptic ulcer disease': {
                        features: 'Epigastric pain, relationship to meals (duodenal: hungry pain, gastric: worse with food), H. pylori history',
                        tests: 'H. pylori testing (stool antigen, urea breath test), upper endoscopy if alarming features',
                        urgency: 'Non-urgent',
                        timeToTreat: 'PPI therapy, H. pylori eradication if positive',
                        clinicalPearls: 'NSAID and H. pylori most common causes. Triple therapy for eradication. Watch for complications',
                        differentiatingFeatures: 'Relationship to meals, response to PPIs, H. pylori positive'
                    }
                }
            },
            'headache': {
                title: 'Headache',
                category: 'Neurology',
                redFlags: '🚩 Sudden severe (thunderclap), fever + neck stiffness, focal neurologic deficits, papilledema',
                presentations: {
                    'Migraine': {
                        features: 'Unilateral, throbbing, 4-72 hours, photophobia, phonophobia, nausea. Aura in 20%. Family history common',
                        tests: 'Clinical diagnosis, neuroimaging if atypical features or red flags',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Triptans (within 2 hours), NSAIDs, antiemetics. Preventive therapy if frequent',
                        clinicalPearls: 'POUND criteria (Pulsating, One day, Unilateral, Nausea, Disabling). Avoid medication overuse',
                        differentiatingFeatures: 'Unilateral throbbing, photophobia, family history'
                    },
                    'Tension headache': {
                        features: 'Bilateral, pressing/tightening, mild-moderate, no photophobia/phonophobia, stress-related',
                        tests: 'Clinical diagnosis',
                        urgency: 'Non-urgent',
                        timeToTreat: 'NSAIDs, acetaminophen, stress management, relaxation techniques',
                        clinicalPearls: 'Most common primary headache. Often chronic. Exclude medication overuse',
                        differentiatingFeatures: 'Bilateral pressing pain, no associated symptoms'
                    },
                    'Cluster headache': {
                        features: 'Unilateral severe, orbital/temporal, 15min-3h, lacrimation, nasal congestion. Male predominance, circadian',
                        tests: 'Clinical diagnosis',
                        urgency: 'Urgent',
                        timeToTreat: 'High-flow oxygen, subcutaneous sumatriptan. Preventive: verapamil',
                        clinicalPearls: 'Attacks in clusters (weeks-months). Patient restless during attack. Alcohol trigger during cluster',
                        differentiatingFeatures: 'Severe unilateral orbital pain, autonomic symptoms, restlessness'
                    },
                    'Subarachnoid hemorrhage': {
                        features: 'Sudden severe (thunderclap), worst headache of life, neck stiffness, photophobia, altered consciousness',
                        tests: 'Non-contrast CT head (within 6h), LP if CT negative, CTA for aneurysm',
                        urgency: 'Emergency',
                        timeToTreat: 'Neurosurgical consultation, aneurysm securing, prevent vasospasm',
                        clinicalPearls: 'Sentinel headache may precede. Hunt-Hess grade for severity. Watch for complications',
                        differentiatingFeatures: 'Thunderclap onset, worst headache ever, meningeal signs'
                    },
                    'Meningitis': {
                        features: 'Fever, headache, neck stiffness, photophobia, altered mental status. Kernig/Brudzinski signs',
                        tests: 'LP (opening pressure, cell count, glucose, protein, culture), blood cultures, CT if focal signs',
                        urgency: 'Emergency',
                        timeToTreat: 'Antibiotics immediately after LP (within 1 hour), steroids for bacterial',
                        clinicalPearls: 'Classic triad only in 44%. Bacterial more acute, viral more indolent. Don\'t delay antibiotics',
                        differentiatingFeatures: 'Fever + headache + neck stiffness, altered mental status'
                    }
                }
            },
            'altered-mental-status': {
                title: 'Altered Mental Status',
                category: 'Neurology/Emergency',
                redFlags: '🚩 Focal neurological signs, hypoglycemia, hypoxia, severe hypotension, hyperthermia',
                presentations: {
                    'Hypoglycemia': {
                        features: 'Confusion, diaphoresis, tachycardia, tremor, hunger. History of diabetes, missed meals, medication errors',
                        tests: 'Blood glucose (<3.9 mmol/L), HbA1c, C-peptide if factitious suspected',
                        urgency: 'Emergency',
                        timeToTreat: 'Immediate glucose correction, glucagon if unable to swallow',
                        clinicalPearls: 'Whipple triad: symptoms + low glucose + relief with treatment. Consider sulphonylurea poisoning',
                        differentiatingFeatures: 'Rapid improvement with glucose, diaphoresis, known diabetes'
                    },
                    'Stroke/TIA': {
                        features: 'Sudden onset focal deficits, FAST positive, speech difficulties, weakness, vision changes',
                        tests: 'CT head (exclude haemorrhage), CT angiogram, MRI if available, ECG, glucose',
                        urgency: 'Emergency',
                        timeToTreat: 'Thrombolysis within 4.5 hours, thrombectomy within 6-24 hours',
                        clinicalPearls: 'ROSIER score for recognition. NIHSS for severity. Time is brain - rapid assessment crucial',
                        differentiatingFeatures: 'Sudden onset, focal signs, FAST positive'
                    },
                    'Sepsis/Septic shock': {
                        features: 'Fever/hypothermia, tachycardia, hypotension, altered mental state, source of infection',
                        tests: 'Blood cultures, lactate, FBC, CRP, procalcitonin, urinalysis, CXR',
                        urgency: 'Emergency',
                        timeToTreat: 'Antibiotics within 1 hour, fluid resuscitation, vasopressors if needed',
                        clinicalPearls: 'qSOFA score for screening. Lactate >2 indicates organ dysfunction. Source control important',
                        differentiatingFeatures: 'Systemic signs of infection, elevated lactate, hypotension'
                    },
                    'Drug intoxication': {
                        features: 'History of ingestion, pupils (miosis/mydriasis), respiratory depression, specific toxidromes',
                        tests: 'Toxicology screen, paracetamol/salicylate levels, ABG, glucose, U&Es',
                        urgency: 'Emergency',
                        timeToTreat: 'Supportive care, specific antidotes (naloxone, flumazenil), activated charcoal if early',
                        clinicalPearls: 'Common toxidromes: opioid (miosis, bradycardia), anticholinergic (mydriasis, dry skin)',
                        differentiatingFeatures: 'History of ingestion, specific toxidrome, response to antidotes'
                    },
                    'Hepatic encephalopathy': {
                        features: 'Known liver disease, asterixis, confusion to coma, precipitants (infection, GI bleed, drugs)',
                        tests: 'Ammonia (elevated), LFTs, FBC, U&Es, blood cultures, ascitic tap if present',
                        urgency: 'Urgent',
                        timeToTreat: 'Lactulose, rifaximin, identify and treat precipitants',
                        clinicalPearls: 'West Haven criteria for grading. Common precipitants: infection, GI bleeding, constipation',
                        differentiatingFeatures: 'Known cirrhosis, asterixis, elevated ammonia'
                    },
                    'Uremic encephalopathy': {
                        features: 'Known CKD, confusion, nausea, muscle twitching, pericardial friction rub',
                        tests: 'U&Es (very high urea/creatinine), urinalysis, ECG (hyperkalaemia), ABG',
                        urgency: 'Emergency',
                        timeToTreat: 'Urgent dialysis, treat hyperkalaemia if present',
                        clinicalPearls: 'Usually urea >40 mmol/L. Watch for hyperkalaemia. Dialysis definitive treatment',
                        differentiatingFeatures: 'Known renal failure, very high urea, muscle twitching'
                    }
                }
            },
            'dizziness': {
                title: 'Dizziness/Vertigo',
                category: 'Neurology/ENT',
                redFlags: '🚩 Focal neurological signs, severe headache, hearing loss, diplopia, dysarthria',
                presentations: {
                    'BPPV': {
                        features: 'Episodic rotational vertigo with position changes, Dix-Hallpike positive, nausea',
                        tests: 'Clinical diagnosis with Dix-Hallpike manoeuvre, audiometry if hearing concerns',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Canalith repositioning procedures (Epley manoeuvre)',
                        clinicalPearls: 'Most common cause of vertigo. Posterior canal most affected. May recur',
                        differentiatingFeatures: 'Positional triggers, Dix-Hallpike positive, brief episodes'
                    },
                    'Vestibular neuronitis': {
                        features: 'Sudden onset severe vertigo, nausea, vomiting, no hearing loss, recent viral illness',
                        tests: 'Clinical diagnosis, audiometry to rule out labyrinthitis',
                        urgency: 'Urgent',
                        timeToTreat: 'Vestibular suppressants (prochlorperazine), early mobilisation',
                        clinicalPearls: 'Horizontal nystagmus away from affected side. Gradual improvement over weeks',
                        differentiatingFeatures: 'Acute severe vertigo, no hearing loss, recent viral illness'
                    },
                    'Meniere disease': {
                        features: 'Episodic vertigo, fluctuating hearing loss, tinnitus, aural fullness',
                        tests: 'Audiometry (low-frequency hearing loss), consider MRI to exclude retrocochlear pathology',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Low-salt diet, diuretics, betahistine, vestibular suppressants for acute attacks',
                        clinicalPearls: 'Triad: vertigo + hearing loss + tinnitus. Attacks last hours to days',
                        differentiatingFeatures: 'Triad of symptoms, fluctuating hearing loss, episodic'
                    },
                    'Posterior circulation stroke': {
                        features: 'Sudden vertigo with neurological signs (diplopia, dysarthria, ataxia, weakness)',
                        tests: 'Urgent CT head, MRI with DWI, CT angiogram, ECG',
                        urgency: 'Emergency',
                        timeToTreat: 'Thrombolysis/thrombectomy if within time window',
                        clinicalPearls: 'HINTS exam (Head Impulse, Nystagmus, Test of Skew) can differentiate from peripheral',
                        differentiatingFeatures: 'Associated neurological signs, negative head impulse test'
                    },
                    'Orthostatic hypotension': {
                        features: 'Dizziness on standing, lightheadedness, near-syncope, medications (antihypertensives)',
                        tests: 'Orthostatic vitals (drop >20 mmHg systolic or >10 mmHg diastolic), ECG',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Medication review, increase fluid/salt intake, compression stockings',
                        clinicalPearls: 'Common in elderly. Check medications (diuretics, alpha-blockers). Gradual position changes',
                        differentiatingFeatures: 'Positional component, medication history, orthostatic vital changes'
                    },
                    'Anxiety/Panic': {
                        features: 'Lightheadedness, palpitations, chest tightness, sense of unreality, hyperventilation',
                        tests: 'Rule out organic causes, consider ECG, glucose if symptoms suggest',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Reassurance, breathing exercises, CBT, consider anxiolytics',
                        clinicalPearls: 'Often in young patients. Associated with agoraphobia. Exclude cardiac/metabolic causes',
                        differentiatingFeatures: 'Associated anxiety symptoms, hyperventilation, young patient'
                    }
                }
            },
            'seizures': {
                title: 'Seizures',
                category: 'Neurology/Emergency',
                redFlags: '🚩 Status epilepticus (>5 minutes), focal neurological deficits, head trauma, fever in adults',
                presentations: {
                    'Tonic-clonic seizure': {
                        features: 'Generalised stiffening then rhythmic jerking, tongue biting, incontinence, post-ictal confusion',
                        tests: 'Blood glucose, U&Es, LFTs, drug levels (if on AEDs), CT head if first seizure',
                        urgency: 'Emergency',
                        timeToTreat: 'Protect airway, benzodiazepines if prolonged (>5 minutes)',
                        clinicalPearls: 'Most recover spontaneously. Lateral recovery position. Check for precipitants',
                        differentiatingFeatures: 'Generalised tonic-clonic movements, post-ictal confusion'
                    },
                    'Status epilepticus': {
                        features: 'Seizure >5 minutes or recurrent seizures without recovery of consciousness',
                        tests: 'Emergency investigations: glucose, U&Es, AED levels, ABG, consider LP if febrile',
                        urgency: 'Emergency',
                        timeToTreat: 'IV lorazepam, then phenytoin/levetiracetam, consider intubation',
                        clinicalPearls: 'Medical emergency. Refractory if continues despite two appropriate AEDs',
                        differentiatingFeatures: 'Prolonged seizure activity, impaired consciousness'
                    },
                    'Focal seizure': {
                        features: 'Localised symptoms (motor, sensory, psychic), may have impaired awareness, aura',
                        tests: 'EEG, MRI brain to identify structural lesion, routine bloods',
                        urgency: 'Urgent',
                        timeToTreat: 'Investigate underlying cause, consider AED therapy',
                        clinicalPearls: 'May indicate structural brain lesion. Can progress to generalised seizure',
                        differentiatingFeatures: 'Focal symptoms, may remain conscious, consistent pattern'
                    },
                    'Febrile seizure': {
                        features: 'Child 6 months-6 years, fever, usually brief generalised seizure',
                        tests: 'Identify source of fever, LP if <12 months or concerning features',
                        urgency: 'Urgent',
                        timeToTreat: 'Treat underlying infection, antipyretics, reassurance to parents',
                        clinicalPearls: 'Simple vs complex (>15 min, focal, recurs in 24h). Family history common',
                        differentiatingFeatures: 'Young child, fever, family history'
                    },
                    'Non-epileptic attack': {
                        features: 'Atypical movements, fluctuating consciousness, eyes closed during event, prolonged duration',
                        tests: 'Video EEG for definitive diagnosis, prolactin not raised post-ictally',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Psychological support, avoid unnecessary AEDs, address underlying trauma',
                        clinicalPearls: 'Often history of trauma/abuse. Side-to-side head movements. Gradual onset/offset',
                        differentiatingFeatures: 'Atypical features, eyes closed, normal EEG during event'
                    },
                    'Syncope (mimicking seizure)': {
                        features: 'Brief loss of consciousness, preceding lightheadedness, pallor, rapid recovery',
                        tests: 'ECG, orthostatic vitals, echo if cardiac cause suspected',
                        urgency: 'Urgent',
                        timeToTreat: 'Treat underlying cause (cardiac, orthostatic), avoid triggers',
                        clinicalPearls: 'Brief myoclonic jerks common. No post-ictal confusion. Triggers often present',
                        differentiatingFeatures: 'Brief duration, rapid recovery, triggers (standing, pain)'
                    }
                }
            },
            'weakness': {
                title: 'Weakness/Paralysis',
                category: 'Neurology',
                redFlags: '🚩 Sudden onset, bilateral weakness, respiratory difficulty, bulbar symptoms',
                presentations: {
                    'Stroke': {
                        features: 'Sudden onset unilateral weakness, facial droop, speech difficulties, FAST positive',
                        tests: 'Urgent CT head, CT angiogram, MRI, ECG, glucose, NIHSS assessment',
                        urgency: 'Emergency',
                        timeToTreat: 'Thrombolysis within 4.5 hours, mechanical thrombectomy up to 24 hours',
                        clinicalPearls: 'Time critical. ROSIER score for recognition. Exclude hypoglycemia and seizure',
                        differentiatingFeatures: 'Sudden onset, unilateral, upper motor neuron signs'
                    },
                    'Guillain-Barré syndrome': {
                        features: 'Ascending symmetrical weakness, areflexia, minimal sensory loss, preceding infection',
                        tests: 'LP (raised protein, normal cells), nerve conduction studies, anti-GM1 antibodies',
                        urgency: 'Emergency',
                        timeToTreat: 'IVIG or plasmapheresis, monitor respiratory function',
                        clinicalPearls: 'Miller-Fisher variant: ophthalmoplegia, ataxia, areflexia. Watch for respiratory failure',
                        differentiatingFeatures: 'Ascending pattern, areflexia, recent infection'
                    },
                    'Myasthenia gravis': {
                        features: 'Fluctuating weakness, worse with activity, ptosis, diplopia, bulbar symptoms',
                        tests: 'Anti-AChR antibodies, Tensilon test, EMG with repetitive stimulation, CT thorax',
                        urgency: 'Urgent',
                        timeToTreat: 'Anticholinesterases, immunosuppression, plasmapheresis if crisis',
                        clinicalPearls: 'Ocular symptoms common initially. Myasthenic crisis can cause respiratory failure',
                        differentiatingFeatures: 'Fatigable weakness, ocular symptoms, improves with rest'
                    },
                    'Spinal cord compression': {
                        features: 'Back pain, bilateral leg weakness, sensory level, bowel/bladder dysfunction',
                        tests: 'Urgent MRI spine, FBC, ESR, PSA (males), protein electrophoresis',
                        urgency: 'Emergency',
                        timeToTreat: 'High-dose steroids, urgent neurosurgical/oncology referral',
                        clinicalPearls: 'Oncological emergency. Cauda equina if bladder/bowel involved. Time critical',
                        differentiatingFeatures: 'Sensory level, bilateral symptoms, bowel/bladder involvement'
                    },
                    'Periodic paralysis': {
                        features: 'Episodic weakness, triggers (exercise, carbohydrates), family history, normal between episodes',
                        tests: 'Potassium levels during attack, genetic testing, muscle biopsy',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Treat electrolyte abnormalities, avoid triggers, prophylactic medications',
                        clinicalPearls: 'Hypokalaemic most common. Thyrotoxic variant in Asian males. Carbonic anhydrase inhibitors help',
                        differentiatingFeatures: 'Episodic nature, family history, electrolyte abnormalities'
                    },
                    'Conversion disorder': {
                        features: 'Inconsistent weakness, normal reflexes, give-way weakness, incongruent examination',
                        tests: 'Diagnosis of exclusion, detailed neurological assessment, psychological evaluation',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Physiotherapy, psychological support, reassurance',
                        clinicalPearls: 'Often precipitated by stress. Hoover sign may be positive. Avoid confrontation',
                        differentiatingFeatures: 'Inconsistent findings, psychological stressors, normal investigations'
                    }
                }
            },
            'nausea-vomiting': {
                title: 'Nausea and Vomiting',
                category: 'Gastroenterology/General',
                redFlags: '🚩 Hematemesis, severe dehydration, projectile vomiting, abdominal distension',
                presentations: {
                    'Gastroenteritis': {
                        features: 'Acute onset nausea, vomiting, diarrhea, crampy pain, fever, food/water exposure',
                        tests: 'Clinical diagnosis, stool MC&S if bloody/severe, U&Es if dehydrated',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Oral rehydration, antiemetics, antibiotics only if severe bacterial',
                        clinicalPearls: 'Usually viral. Norovirus common in outbreaks. Antibiotics may prolong shedding',
                        differentiatingFeatures: 'Acute onset, diarrhea, fever, food exposure'
                    },
                    'Bowel obstruction': {
                        features: 'Vomiting (early if small bowel), crampy pain, distension, constipation, previous surgery',
                        tests: 'CT abdomen/pelvis, AXR, FBC, U&Es, lactate',
                        urgency: 'Emergency',
                        timeToTreat: 'NBM, NG decompression, IV fluids, surgery if complete',
                        clinicalPearls: 'Small bowel: early vomiting, less distension. Large bowel: late vomiting, more distension',
                        differentiatingFeatures: 'Crampy pain, distension, previous abdominal surgery'
                    },
                    'Pregnancy': {
                        features: 'Missed period, morning sickness, breast tenderness, fatigue, food aversions',
                        tests: 'Pregnancy test (urine/serum βhCG), FBC if hyperemesis gravidarum',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Small frequent meals, ginger, antiemetics if severe',
                        clinicalPearls: 'Hyperemesis gravidarum if severe (weight loss, ketosis). Usually improves by 16 weeks',
                        differentiatingFeatures: 'Reproductive age female, missed period, positive pregnancy test'
                    },
                    'Medication side effects': {
                        features: 'Recent medication changes, chemotherapy, opioids, antibiotics, timing related to doses',
                        tests: 'Review medication history, drug levels if applicable',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Dose adjustment, antiemetics, alternative medications',
                        clinicalPearls: 'Common with chemotherapy, opioids, antibiotics. Ondansetron effective for chemotherapy',
                        differentiatingFeatures: 'Temporal relationship with medications, known emetogenic drugs'
                    },
                    'Migraine': {
                        features: 'Headache with nausea/vomiting, photophobia, phonophobia, aura, family history',
                        tests: 'Clinical diagnosis, neuroimaging if atypical features',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Triptans, antiemetics, NSAIDs, dark quiet environment',
                        clinicalPearls: 'Nausea often prominent. Metoclopramide helps both nausea and headache',
                        differentiatingFeatures: 'Associated headache, photophobia, family history'
                    },
                    'Appendicitis': {
                        features: 'Initially periumbilical pain → RLQ, nausea, vomiting, fever, McBurney point tenderness',
                        tests: 'CT abdomen/pelvis, FBC, CRP, urinalysis',
                        urgency: 'Emergency',
                        timeToTreat: 'Appendicectomy, antibiotics if perforated',
                        clinicalPearls: 'Vomiting after pain onset. Rovsing sign. Atypical in elderly/pregnant',
                        differentiatingFeatures: 'Pain migration to RLQ, fever, rebound tenderness'
                    }
                }
            },
            'back-pain': {
                title: 'Back Pain',
                category: 'Musculoskeletal/Emergency',
                redFlags: '🚩 Bowel/bladder dysfunction, saddle anaesthesia, bilateral leg symptoms, fever',
                presentations: {
                    'Mechanical low back pain': {
                        features: 'Gradual onset, worse with movement, better with rest, no neurological signs',
                        tests: 'Clinical diagnosis, imaging only if red flags or persistent >6 weeks',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Analgesia, early mobilisation, physiotherapy, avoid bed rest',
                        clinicalPearls: 'Most resolve within 6 weeks. Avoid early imaging unless red flags',
                        differentiatingFeatures: 'Mechanical pain, no neurological signs, improves with rest'
                    },
                    'Sciatica/Disc prolapse': {
                        features: 'Leg pain worse than back pain, dermatomal distribution, positive straight leg raise',
                        tests: 'MRI if persistent >6 weeks or neurological deficit, nerve conduction studies',
                        urgency: 'Urgent if neurological deficit',
                        timeToTreat: 'Analgesia, physiotherapy, consider surgery if severe/persistent',
                        clinicalPearls: 'L5/S1 most common. Positive crossed straight leg raise more specific',
                        differentiatingFeatures: 'Dermatomal leg pain, positive straight leg raise'
                    },
                    'Cauda equina syndrome': {
                        features: 'Bilateral leg symptoms, saddle anaesthesia, bowel/bladder dysfunction, severe pain',
                        tests: 'Urgent MRI lumbosacral spine, post-void bladder scan',
                        urgency: 'Emergency',
                        timeToTreat: 'Urgent surgical decompression within 24-48 hours',
                        clinicalPearls: 'Surgical emergency. May have insidious onset. High index of suspicion needed',
                        differentiatingFeatures: 'Bilateral symptoms, saddle anaesthesia, bladder dysfunction'
                    },
                    'Spinal infection': {
                        features: 'Severe pain, fever, risk factors (IVDU, immunosuppression, recent surgery)',
                        tests: 'FBC, ESR, CRP, blood cultures, MRI spine',
                        urgency: 'Emergency',
                        timeToTreat: 'IV antibiotics, surgical drainage if abscess',
                        clinicalPearls: 'Discitis, osteomyelitis, epidural abscess. May present without fever in elderly',
                        differentiatingFeatures: 'Fever, risk factors, raised inflammatory markers'
                    },
                    'Vertebral fracture': {
                        features: 'Severe pain after trauma/fall, elderly with osteoporosis, point tenderness',
                        tests: 'Plain X-rays, CT if neurological signs, DEXA scan for osteoporosis',
                        urgency: 'Urgent',
                        timeToTreat: 'Analgesia, bracing, vertebroplasty if severe, treat osteoporosis',
                        clinicalPearls: 'Common in elderly with minimal trauma. Check for other fractures',
                        differentiatingFeatures: 'History of trauma, osteoporosis, point tenderness'
                    },
                    'Ankylosing spondylitis': {
                        features: 'Young male, morning stiffness >1 hour, improves with exercise, family history',
                        tests: 'HLA-B27, ESR, CRP, MRI sacroiliac joints, plain X-rays',
                        urgency: 'Non-urgent',
                        timeToTreat: 'NSAIDs, physiotherapy, biologics if severe',
                        clinicalPearls: 'Inflammatory back pain. Schober test for spinal mobility. Eye involvement common',
                        differentiatingFeatures: 'Young male, morning stiffness, improves with exercise'
                    }
                }
            },
            'diarrhea': {
                title: 'Diarrhea',
                category: 'Gastroenterology',
                redFlags: '🚩 Bloody stools, severe dehydration, high fever, immunocompromised, recent antibiotics',
                presentations: {
                    'Viral gastroenteritis': {
                        features: 'Acute watery diarrhea, nausea, vomiting, low-grade fever, household contacts affected',
                        tests: 'Clinical diagnosis, stool MC&S if severe/prolonged, U&Es if dehydrated',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Oral rehydration, symptomatic treatment, usually self-limiting',
                        clinicalPearls: 'Norovirus most common. Usually resolves in 2-3 days. Highly contagious',
                        differentiatingFeatures: 'Watery stools, household outbreak, viral prodrome'
                    },
                    'Bacterial gastroenteritis': {
                        features: 'Bloody diarrhea, high fever, severe cramping, food exposure (poultry, eggs, dairy)',
                        tests: 'Stool MC&S, blood cultures if systemic, C. diff toxin if recent antibiotics',
                        urgency: 'Urgent',
                        timeToTreat: 'Antibiotics if severe (ciprofloxacin), supportive care',
                        clinicalPearls: 'Salmonella, Campylobacter, Shigella common. Avoid antimotility agents',
                        differentiatingFeatures: 'Bloody stools, high fever, severe symptoms'
                    },
                    'C. difficile colitis': {
                        features: 'Recent antibiotics, watery/bloody diarrhea, cramping, may have toxic megacolon',
                        tests: 'C. diff toxin (PCR preferred), FBC, CRP, AXR if toxic megacolon suspected',
                        urgency: 'Emergency if severe',
                        timeToTreat: 'Oral vancomycin or fidaxomicin, stop precipitating antibiotics',
                        clinicalPearls: 'Fulminant colitis can be life-threatening. PPI use also risk factor',
                        differentiatingFeatures: 'Recent antibiotic use, healthcare setting, positive C. diff'
                    },
                    'Inflammatory bowel disease': {
                        features: 'Chronic bloody diarrhea, weight loss, extraintestinal features (arthritis, eye problems)',
                        tests: 'Colonoscopy with biopsy, faecal calprotectin, CRP, FBC',
                        urgency: 'Urgent if acute flare',
                        timeToTreat: 'Aminosalicylates, steroids for flares, immunosuppression',
                        clinicalPearls: 'UC: continuous from rectum. Crohn: skip lesions, transmural',
                        differentiatingFeatures: 'Chronic course, extraintestinal features, young patient'
                    },
                    'Traveller\'s diarrhea': {
                        features: 'Recent travel to endemic area, acute watery diarrhea, may have blood/mucus',
                        tests: 'Stool MC&S including parasites, O&P examination',
                        urgency: 'Non-urgent unless severe',
                        timeToTreat: 'Ciprofloxacin if bacterial, specific treatment for parasites',
                        clinicalPearls: 'ETEC most common bacterial cause. Giardia common parasitic cause',
                        differentiatingFeatures: 'Recent travel history, endemic area exposure'
                    },
                    'Medication-induced': {
                        features: 'Recent medication changes, antibiotics, PPIs, metformin, colchicine',
                        tests: 'Review medication history, stool studies if prolonged',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Stop offending medication, supportive care',
                        clinicalPearls: 'Antibiotics disrupt normal flora. Magnesium-containing antacids common cause',
                        differentiatingFeatures: 'Temporal relationship with medication, known causative drugs'
                    }
                }
            },
            'constipation': {
                title: 'Constipation',
                category: 'Gastroenterology',
                redFlags: '🚩 Acute onset in elderly, weight loss, rectal bleeding, complete obstruction',
                presentations: {
                    'Functional constipation': {
                        features: 'Chronic constipation, no alarm features, may have IBS symptoms',
                        tests: 'Clinical diagnosis, consider colonoscopy if >50 years or alarm features',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Dietary fibre, fluid intake, laxatives (macrogol, senna)',
                        clinicalPearls: 'Rome IV criteria. Exclude organic causes. Toilet position important',
                        differentiatingFeatures: 'Chronic course, no alarm features, dietary factors'
                    },
                    'Medication-induced': {
                        features: 'Recent medication changes, opioids, anticholinergics, iron supplements',
                        tests: 'Medication review, basic investigations if severe',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Review medications, laxatives, opioid antagonists if appropriate',
                        clinicalPearls: 'Opioids very constipating. Calcium channel blockers, antihistamines also cause',
                        differentiatingFeatures: 'Temporal relationship with medications, known constipating drugs'
                    },
                    'Colorectal cancer': {
                        features: 'Change in bowel habit, weight loss, rectal bleeding, family history, >50 years',
                        tests: 'Urgent colonoscopy, CT colonography, CEA, FBC',
                        urgency: 'Urgent',
                        timeToTreat: 'Urgent 2-week-wait referral for investigation',
                        clinicalPearls: 'Left-sided tumours cause obstruction. Right-sided may present with anaemia',
                        differentiatingFeatures: 'New-onset in elderly, weight loss, rectal bleeding'
                    },
                    'Hypothyroidism': {
                        features: 'Fatigue, weight gain, cold intolerance, dry skin, bradycardia',
                        tests: 'TSH, free T4, consider TPO antibodies',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Levothyroxine replacement, start low dose in elderly',
                        clinicalPearls: 'Often insidious onset. May present with constipation alone',
                        differentiatingFeatures: 'Associated hypothyroid symptoms, elevated TSH'
                    },
                    'Anal fissure': {
                        features: 'Severe pain with defecation, small amount of bright red blood, anal spasm',
                        tests: 'Clinical examination (may require EUA), sigmoidoscopy if atypical',
                        urgency: 'Non-urgent',
                        timeToTreat: 'High-fibre diet, topical anaesthetics, GTN ointment',
                        clinicalPearls: 'Anal fissures cause secondary constipation due to pain. Lateral fissures suspicious',
                        differentiatingFeatures: 'Severe anal pain, fear of defecation, visible fissure'
                    },
                    'Hirschsprung disease': {
                        features: 'Chronic constipation from birth, failure to thrive, delayed passage of meconium',
                        tests: 'Rectal biopsy (absent ganglion cells), barium enema',
                        urgency: 'Urgent in neonates',
                        timeToTreat: 'Surgical correction (pull-through procedure)',
                        clinicalPearls: 'Congenital absence of enteric neurons. Family history in 20%',
                        differentiatingFeatures: 'Neonatal presentation, delayed meconium, failure to thrive'
                    }
                }
            },
            'jaundice': {
                title: 'Jaundice',
                category: 'Hepatology/Gastroenterology',
                redFlags: '🚩 Acute onset with confusion, coagulopathy, severe abdominal pain, hypotension',
                presentations: {
                    'Viral hepatitis': {
                        features: 'Prodromal illness, fatigue, nausea, RUQ pain, dark urine, pale stools',
                        tests: 'Hep A/B/C/E serology, LFTs (ALT>>bilirubin), FBC, PT/INR',
                        urgency: 'Urgent',
                        timeToTreat: 'Supportive care, avoid hepatotoxic drugs, monitor for fulminant hepatitis',
                        clinicalPearls: 'Hep A: faeco-oral, self-limiting. Hep B: blood-borne, may become chronic',
                        differentiatingFeatures: 'Prodromal illness, very high ALT, positive serology'
                    },
                    'Gallstones/Cholangitis': {
                        features: 'RUQ pain, fever, jaundice (Charcot triad), may have hypotension/confusion',
                        tests: 'LFTs (conjugated bilirubin, ALP), MRCP, blood cultures, ultrasound',
                        urgency: 'Emergency',
                        timeToTreat: 'Antibiotics, urgent ERCP with sphincterotomy',
                        clinicalPearls: 'Reynolds pentad if hypotension/confusion. Urgent decompression needed',
                        differentiatingFeatures: 'Charcot triad, gallstones on imaging, elevated ALP'
                    },
                    'Drug-induced hepatitis': {
                        features: 'Recent medication exposure, paracetamol, antibiotics, anticonvulsants, herbs',
                        tests: 'LFTs, paracetamol level, drug levels if applicable, PT/INR',
                        urgency: 'Emergency if fulminant',
                        timeToTreat: 'Stop offending drug, N-acetylcysteine for paracetamol, supportive care',
                        clinicalPearls: 'Paracetamol most common. Dose-dependent vs idiosyncratic reactions',
                        differentiatingFeatures: 'Medication exposure, elevated ALT, improvement after stopping drug'
                    },
                    'Alcoholic hepatitis': {
                        features: 'Heavy alcohol use, fever, hepatomegaly, may have ascites/encephalopathy',
                        tests: 'LFTs (AST:ALT >2:1), GGT, FBC, PT/INR, discriminant function',
                        urgency: 'Urgent',
                        timeToTreat: 'Alcohol cessation, prednisolone if severe, nutritional support',
                        clinicalPearls: 'Maddrey discriminant function >32 indicates severe disease',
                        differentiatingFeatures: 'Alcohol history, AST:ALT ratio >2:1, hepatomegaly'
                    },
                    'Pancreatic cancer': {
                        features: 'Painless progressive jaundice, weight loss, palpable gallbladder (Courvoisier sign)',
                        tests: 'CT abdomen, MRCP, CA 19-9, ERCP with biopsy/stenting',
                        urgency: 'Urgent',
                        timeToTreat: 'Urgent oncology referral, biliary stenting for palliation',
                        clinicalPearls: 'Courvoisier law: palpable gallbladder with jaundice suggests malignancy',
                        differentiatingFeatures: 'Painless jaundice, weight loss, palpable gallbladder'
                    },
                    'Haemolytic anaemia': {
                        features: 'Anaemia, splenomegaly, unconjugated hyperbilirubinaemia, dark urine',
                        tests: 'FBC (anaemia, spherocytes), LDH, haptoglobin, Coombs test, blood film',
                        urgency: 'Urgent',
                        timeToTreat: 'Treat underlying cause, steroids if autoimmune, folic acid',
                        clinicalPearls: 'Unconjugated bilirubin predominates. Look for underlying cause',
                        differentiatingFeatures: 'Anaemia, unconjugated bilirubin, elevated LDH'
                    }
                }
            },
            'fever': {
                title: 'Fever',
                category: 'Infectious Disease/General',
                redFlags: '🚩 Hypotension, altered mental status, petechial rash, neck stiffness, immunocompromised',
                presentations: {
                    'Viral upper respiratory tract infection': {
                        features: 'Gradual onset, rhinorrhoea, sore throat, myalgia, low-grade fever',
                        tests: 'Clinical diagnosis, throat swab if bacterial suspected',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Symptomatic treatment, paracetamol, plenty of fluids',
                        clinicalPearls: 'Most common cause of fever. Usually self-limiting in 5-7 days',
                        differentiatingFeatures: 'URTI symptoms, gradual onset, low-grade fever'
                    },
                    'Pneumonia': {
                        features: 'Cough, purulent sputum, dyspnea, pleuritic chest pain, crackles',
                        tests: 'CXR, blood cultures, sputum culture, FBC, CRP, urea',
                        urgency: 'Urgent',
                        timeToTreat: 'Antibiotics within 4 hours, supportive care',
                        clinicalPearls: 'CURB-65 for severity assessment. Atypical organisms in young adults',
                        differentiatingFeatures: 'Respiratory symptoms, infiltrate on CXR, elevated CRP'
                    },
                    'Urinary tract infection': {
                        features: 'Dysuria, frequency, urgency, suprapubic pain, may have loin pain',
                        tests: 'Urine dipstick, midstream urine MC&S, blood cultures if systemically unwell',
                        urgency: 'Urgent if pyelonephritis',
                        timeToTreat: 'Antibiotics (trimethoprim, nitrofurantoin), analgesia',
                        clinicalPearls: 'Nitrites more specific than leucocytes. Pyelonephritis if loin pain/systemic',
                        differentiatingFeatures: 'Urinary symptoms, positive urine dipstick'
                    },
                    'Meningitis': {
                        features: 'Headache, neck stiffness, photophobia, vomiting, petechial rash',
                        tests: 'Blood cultures, lumbar puncture, throat swab, FBC, CRP',
                        urgency: 'Emergency',
                        timeToTreat: 'Antibiotics immediately, don\'t delay for LP if meningococcal suspected',
                        clinicalPearls: 'Classic triad uncommon. Non-blanching rash suggests meningococcal',
                        differentiatingFeatures: 'Meningism, photophobia, petechial rash'
                    },
                    'Sepsis': {
                        features: 'Source of infection, hypotension, tachycardia, altered mental state, oliguria',
                        tests: 'Blood cultures, lactate, FBC, CRP, source-specific investigations',
                        urgency: 'Emergency',
                        timeToTreat: 'Antibiotics within 1 hour, fluid resuscitation, source control',
                        clinicalPearls: 'qSOFA screening tool. Lactate >2 mmol/L indicates organ dysfunction',
                        differentiatingFeatures: 'Systemic features, hypotension, elevated lactate'
                    },
                    'Malaria': {
                        features: 'Recent travel to endemic area, cyclical fever, rigors, headache, myalgia',
                        tests: 'Thick and thin blood films, rapid antigen tests, FBC',
                        urgency: 'Emergency',
                        timeToTreat: 'Antimalarial therapy based on species and resistance pattern',
                        clinicalPearls: 'P. falciparum most dangerous. Cyclical fever not always present',
                        differentiatingFeatures: 'Travel history, cyclical fever, positive blood film'
                    }
                }
            },
            'syncope': {
                title: 'Syncope',
                category: 'Cardiology/Neurology',
                redFlags: '🚩 Exertional syncope, family history sudden death, structural heart disease, prolonged recovery',
                presentations: {
                    'Vasovagal syncope': {
                        features: 'Triggers (standing, pain, emotion), prodrome (nausea, sweating), rapid recovery',
                        tests: 'Clinical diagnosis, ECG, echocardiogram if cardiac risk factors',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Avoid triggers, increase fluid/salt intake, tilt training',
                        clinicalPearls: 'Most common cause. Typical triggers and prodromal symptoms',
                        differentiatingFeatures: 'Clear triggers, prodromal symptoms, rapid recovery'
                    },
                    'Cardiac arrhythmia': {
                        features: 'Sudden onset, minimal prodrome, palpitations, may occur supine',
                        tests: 'ECG, 24-48 hour Holter monitor, echocardiogram, exercise testing',
                        urgency: 'Urgent',
                        timeToTreat: 'Treat underlying arrhythmia, pacemaker if bradycardia',
                        clinicalPearls: 'VT, complete heart block, sick sinus syndrome. May need EP studies',
                        differentiatingFeatures: 'Sudden onset, minimal warning, palpitations'
                    },
                    'Orthostatic hypotension': {
                        features: 'Symptoms on standing, medications (antihypertensives), elderly',
                        tests: 'Orthostatic vital signs, medication review, autonomic function tests',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Medication review, gradual position changes, compression stockings',
                        clinicalPearls: '>20 mmHg drop systolic or >10 mmHg diastolic. Common in elderly',
                        differentiatingFeatures: 'Positional triggers, medication history, elderly'
                    },
                    'Aortic stenosis': {
                        features: 'Exertional syncope, chest pain, dyspnea, ejection systolic murmur',
                        tests: 'Echocardiogram (valve area, gradient), ECG, CXR',
                        urgency: 'Urgent',
                        timeToTreat: 'Aortic valve replacement if severe, avoid vasodilators',
                        clinicalPearls: 'Classic triad: angina, syncope, heart failure. Poor prognosis if symptomatic',
                        differentiatingFeatures: 'Exertional symptoms, murmur, elderly'
                    },
                    'Hypertrophic cardiomyopathy': {
                        features: 'Young athlete, family history sudden death, may have murmur that increases with Valsalva',
                        tests: 'Echocardiogram, ECG, genetic testing, family screening',
                        urgency: 'Urgent',
                        timeToTreat: 'Activity restriction, beta-blockers, ICD if high risk',
                        clinicalPearls: 'Leading cause of sudden death in young athletes. Autosomal dominant',
                        differentiatingFeatures: 'Young age, family history, murmur increases with Valsalva'
                    },
                    'Seizure': {
                        features: 'Tonic-clonic movements, tongue biting, incontinence, post-ictal confusion',
                        tests: 'Glucose, EEG, MRI brain, prolactin level',
                        urgency: 'Urgent',
                        timeToTreat: 'Antiepileptic drugs if recurrent, investigate underlying cause',
                        clinicalPearls: 'Convulsive syncope can mimic seizure. True seizures have post-ictal phase',
                        differentiatingFeatures: 'Tonic-clonic movements, post-ictal confusion'
                    }
                }
            },
            'urinary-symptoms': {
                title: 'Urinary Symptoms',
                category: 'Urology/Nephrology',
                redFlags: '🚩 Acute kidney injury, anuria, haematuria with clots, severe loin pain',
                presentations: {
                    'Urinary tract infection': {
                        features: 'Dysuria, frequency, urgency, suprapubic pain, cloudy/smelly urine',
                        tests: 'Urine dipstick, midstream urine MC&S, blood cultures if systemically unwell',
                        urgency: 'Non-urgent unless complicated',
                        timeToTreat: 'Antibiotics (trimethoprim, nitrofurantoin), increase fluid intake',
                        clinicalPearls: 'Nitrites more specific than leucocytes. Treat for 3 days if uncomplicated',
                        differentiatingFeatures: 'Classic urinary symptoms, positive dipstick'
                    },
                    'Pyelonephritis': {
                        features: 'Loin pain, fever, rigors, nausea, vomiting, may have lower urinary symptoms',
                        tests: 'Urine MC&S, blood cultures, FBC, CRP, U&Es, ultrasound if recurrent',
                        urgency: 'Urgent',
                        timeToTreat: 'IV antibiotics (co-amoxiclav), analgesia, supportive care',
                        clinicalPearls: 'More common in women. May lead to sepsis. Check for structural abnormalities',
                        differentiatingFeatures: 'Loin pain, fever, systemic upset'
                    },
                    'Kidney stones': {
                        features: 'Severe colicky loin-to-groin pain, haematuria, nausea, vomiting, restlessness',
                        tests: 'CT KUB (non-contrast), urinalysis, U&Es, calcium, uric acid',
                        urgency: 'Urgent',
                        timeToTreat: 'Strong analgesia, alpha-blockers, lithotripsy/surgery if large',
                        clinicalPearls: 'Calcium oxalate most common. Uric acid stones radiolucent on plain X-ray',
                        differentiatingFeatures: 'Colicky pain, patient unable to lie still, haematuria'
                    },
                    'Acute urinary retention': {
                        features: 'Unable to pass urine, suprapubic pain, palpable bladder, elderly male',
                        tests: 'Bladder scan, U&Es, PSA (after catheterisation), urinalysis',
                        urgency: 'Emergency',
                        timeToTreat: 'Immediate catheterisation, alpha-blockers, urology referral',
                        clinicalPearls: 'BPH most common cause in men. Constipation, drugs common in women',
                        differentiatingFeatures: 'Complete inability to void, palpable bladder'
                    },
                    'Prostatitis': {
                        features: 'Perineal pain, dysuria, fever, tender prostate on PR examination',
                        tests: 'Urine MC&S, blood cultures, avoid vigorous PR examination',
                        urgency: 'Urgent',
                        timeToTreat: 'Antibiotics (ciprofloxacin for 28 days), alpha-blockers',
                        clinicalPearls: 'Avoid vigorous massage as may cause bacteraemia. Consider chronic prostatitis',
                        differentiatingFeatures: 'Perineal pain, fever, tender prostate'
                    },
                    'Interstitial cystitis': {
                        features: 'Chronic pelvic pain, frequency, urgency, negative urine cultures',
                        tests: 'Cystoscopy, urodynamics, exclude other causes',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Bladder training, amitriptyline, pentosan polysulfate',
                        clinicalPearls: 'Diagnosis of exclusion. More common in women. Pain relief with voiding',
                        differentiatingFeatures: 'Chronic symptoms, negative cultures, bladder pain'
                    }
                }
            },
            'weight-loss': {
                title: 'Unintentional Weight Loss',
                category: 'General Medicine/Oncology',
                redFlags: '🚩 >10% weight loss in 6 months, night sweats, lymphadenopathy, rectal bleeding',
                presentations: {
                    'Malignancy': {
                        features: 'Progressive weight loss, night sweats, fatigue, site-specific symptoms',
                        tests: 'FBC, LFTs, CXR, CT chest/abdomen/pelvis, tumour markers',
                        urgency: 'Urgent',
                        timeToTreat: 'Urgent 2-week-wait referral based on suspected primary',
                        clinicalPearls: 'Lung, GI, pancreatic cancers commonly present with weight loss',
                        differentiatingFeatures: 'Progressive loss, night sweats, other suspicious symptoms'
                    },
                    'Hyperthyroidism': {
                        features: 'Weight loss despite good appetite, palpitations, tremor, heat intolerance',
                        tests: 'TSH (suppressed), free T4, T3, TSH receptor antibodies',
                        urgency: 'Urgent',
                        timeToTreat: 'Antithyroid drugs (carbimazole), beta-blockers for symptoms',
                        clinicalPearls: 'Graves disease most common. May have thyroid eye disease',
                        differentiatingFeatures: 'Good appetite, thyrotoxic symptoms, suppressed TSH'
                    },
                    'Depression': {
                        features: 'Poor appetite, low mood, anhedonia, sleep disturbance, fatigue',
                        tests: 'Clinical assessment, PHQ-9 score, exclude organic causes',
                        urgency: 'Non-urgent unless suicidal',
                        timeToTreat: 'Antidepressants, psychological therapies, social support',
                        clinicalPearls: 'Common in elderly. May present as failure to thrive',
                        differentiatingFeatures: 'Mood symptoms, poor appetite, sleep disturbance'
                    },
                    'Diabetes mellitus': {
                        features: 'Polyuria, polydipsia, fatigue, recurrent infections, family history',
                        tests: 'Random glucose, HbA1c, fasting glucose, ketones if suspected DKA',
                        urgency: 'Urgent if DKA suspected',
                        timeToTreat: 'Insulin if type 1, metformin if type 2, dietary advice',
                        clinicalPearls: 'Type 1 usually young with rapid onset. Type 2 more insidious',
                        differentiatingFeatures: 'Classical triad, elevated glucose'
                    },
                    'Inflammatory bowel disease': {
                        features: 'Diarrhea, abdominal pain, rectal bleeding, extraintestinal features',
                        tests: 'Colonoscopy with biopsy, faecal calprotectin, CRP, FBC',
                        urgency: 'Urgent',
                        timeToTreat: 'Aminosalicylates, steroids for flares, immunosuppression',
                        clinicalPearls: 'Young adults commonly affected. Extraintestinal features important',
                        differentiatingFeatures: 'GI symptoms, young adult, raised inflammatory markers'
                    },
                    'COPD': {
                        features: 'Smoking history, progressive dyspnea, chronic cough, frequent infections',
                        tests: 'Spirometry, CXR, BMI calculation, alpha-1 antitrypsin',
                        urgency: 'Non-urgent unless acute exacerbation',
                        timeToTreat: 'Smoking cessation, bronchodilators, pulmonary rehabilitation',
                        clinicalPearls: 'Weight loss indicates severe disease. Nutritional support important',
                        differentiatingFeatures: 'Smoking history, respiratory symptoms, cachexia'
                    }
                }
            },
            'palpitations': {
                title: 'Palpitations',
                category: 'Cardiology',
                redFlags: '🚩 Syncope, chest pain, severe dyspnea, hemodynamic instability',
                presentations: {
                    'Anxiety/Panic attack': {
                        features: 'Rapid onset, associated anxiety, sweating, tremor, sense of doom',
                        tests: 'ECG (often normal), consider thyroid function, glucose if indicated',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Reassurance, breathing exercises, beta-blockers if needed',
                        clinicalPearls: 'Most common cause. Often in young patients. Exclude organic causes',
                        differentiatingFeatures: 'Associated anxiety, young patient, normal ECG'
                    },
                    'Atrial fibrillation': {
                        features: 'Irregular pulse, may be asymptomatic, dyspnea, chest discomfort',
                        tests: 'ECG (irregularly irregular), echocardiogram, thyroid function',
                        urgency: 'Urgent if fast rate or unstable',
                        timeToTreat: 'Rate control, anticoagulation, consider rhythm control',
                        clinicalPearls: 'Most common sustained arrhythmia. Stroke risk with CHA2DS2-VASc',
                        differentiatingFeatures: 'Irregularly irregular pulse, ECG changes'
                    },
                    'Supraventricular tachycardia': {
                        features: 'Sudden onset/offset, regular fast pulse, chest discomfort, dyspnea',
                        tests: 'ECG during episode, adenosine test, electrophysiology studies',
                        urgency: 'Urgent',
                        timeToTreat: 'Vagal manoeuvres, adenosine, DC cardioversion if unstable',
                        clinicalPearls: 'Often in young patients. Accessory pathways (WPW) may be present',
                        differentiatingFeatures: 'Sudden onset/offset, regular tachycardia'
                    },
                    'Ventricular tachycardia': {
                        features: 'Rapid regular pulse, chest pain, dyspnea, may cause hemodynamic compromise',
                        tests: 'ECG (wide complex tachycardia), echocardiogram, cardiac catheterisation',
                        urgency: 'Emergency',
                        timeToTreat: 'DC cardioversion if unstable, amiodarone, treat underlying cause',
                        clinicalPearls: 'Usually indicates structural heart disease. High risk of sudden death',
                        differentiatingFeatures: 'Wide complex tachycardia, hemodynamic compromise'
                    },
                    'Hyperthyroidism': {
                        features: 'Weight loss, heat intolerance, tremor, frequent palpitations',
                        tests: 'TSH (suppressed), free T4/T3, TSH receptor antibodies',
                        urgency: 'Urgent',
                        timeToTreat: 'Antithyroid drugs, beta-blockers for symptom control',
                        clinicalPearls: 'AF common complication. Thyroid storm is life-threatening',
                        differentiatingFeatures: 'Thyrotoxic symptoms, suppressed TSH'
                    },
                    'Caffeine/Stimulants': {
                        features: 'Temporal relationship with caffeine/drugs, anxiety, tremor',
                        tests: 'Clinical history, urine drug screen if suspicious',
                        urgency: 'Non-urgent',
                        timeToTreat: 'Reduce/eliminate stimulants, supportive care',
                        clinicalPearls: 'Energy drinks, cocaine, amphetamines. Often in young patients',
                        differentiatingFeatures: 'Clear temporal relationship, drug/caffeine history'
                    }
                }
            }
        };


// Export helper functions
export function searchDifferentials(query) {
    const results = [];
    const searchTerm = query.toLowerCase();
    
    Object.keys(differentialDatabase).forEach(key => {
        const item = differentialDatabase[key];
        if (item.title.toLowerCase().includes(searchTerm) || 
            item.category.toLowerCase().includes(searchTerm)) {
            results.push({ key, ...item });
        }
        
        // Search within presentations
        Object.keys(item.presentations).forEach(presKey => {
            const pres = item.presentations[presKey];
            if (presKey.toLowerCase().includes(searchTerm) ||
                pres.features.toLowerCase().includes(searchTerm)) {
                results.push({ 
                    key,
                    presentation: presKey, 
                    parentTitle: item.title,
                    ...pres 
                });
            }
        });
    });
    
    return results;
}

export function getDifferentialsByCategory(category) {
    return Object.keys(differentialDatabase)
        .filter(key => differentialDatabase[key].category.toLowerCase().includes(category.toLowerCase()))
        .map(key => ({ key, ...differentialDatabase[key] }));
}

export function getAllCategories() {
    const categories = new Set();
    Object.values(differentialDatabase).forEach(item => {
        categories.add(item.category);
    });
    return Array.from(categories).sort();
}
