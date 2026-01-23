export const psychiatryLibrary = [
    {
        id: 'mdd',
        title: 'Major depressive disorder',
        icon: '🌥️',
        tags: ['Mood', 'High risk'],
        summary: '≥2 weeks of low mood or anhedonia with sleep/appetite change, fatigue, guilt, poor concentration.',
        distinguishing: [
            'Check episode length, anhedonia, psychomotor slowing',
            'Exclude bipolar spectrum and substance/medical causes'
        ],
        firstLine: [
            'SSRI/SNRI plus structured psychotherapy (CBT/IPT/behavioural activation)',
            'Sertraline 50mg OD (up-titrate to 200mg) or escitalopram 10mg OD; consider mirtazapine 15–45mg nocte if weight gain/sedation helpful',
            'Safety planning, activity scheduling, address sleep hygiene'
        ],
        secondLine: [
            'Switch to an alternative SSRI/SNRI or mirtazapine/bupropion',
            'Augment with atypical antipsychotic (e.g., aripiprazole 5–15mg) or lithium in specialist care; consider venlafaxine XR 75–225mg if partial response'
        ],
        investigations: [
            'CBC, CMP, TSH, B12/folate, pregnancy test if relevant',
            'Vitals, weight/BMI; glucose/lipids if starting certain meds'
        ],
        crisis: [
            'Escalate if suicidality, self-neglect or safeguarding concerns',
            'Use least restrictive options; document capacity and risk review'
        ],
        monitoring: [
            'Review within 2 weeks of starting antidepressant (weekly if <30 or high risk)',
            'Continue medication 6–12 months post-remission; longer if recurrent'
        ]
    },
    {
        id: 'bipolar',
        title: 'Bipolar disorder',
        icon: '⚡',
        tags: ['Mood', 'Long-term'],
        summary: 'Episodes of mania/hypomania with reduced sleep, pressured speech, risk-taking; depressive episodes common.',
        distinguishing: [
            'History of mania/hypomania or antidepressant-induced switches',
            'Family history, seasonal patterns, clear episodicity',
            'Type I: ≥1 manic episode (may have psychosis); Type II: hypomania + major depression without full mania'
        ],
        firstLine: [
            'Mood stabiliser (lithium 400–1200mg/day in divided doses or valproate 500–2000mg/day) or atypical antipsychotic',
            'Psychoeducation, sleep regularity, avoid antidepressant monotherapy'
        ],
        secondLine: [
            'Switch mood stabiliser class or combine with atypical antipsychotic',
            'Consider lamotrigine 25–200mg titration for bipolar depression; carbamazepine or LAI antipsychotics if adherence issues'
        ],
        investigations: [
            'Baseline U&Es, eGFR, TFTs, calcium for lithium; LFTs/platelets for valproate',
            'Pregnancy test before teratogenic agents; ECG if QT risk; weight/glucose/lipids'
        ],
        crisis: [
            'Detain if dangerousness or inability to care for self due to mania/psychosis',
            'Use rapid tranquillisation protocols only under senior guidance'
        ],
        monitoring: [
            'Lithium levels weekly until stable then 3–6 monthly; monitor renal/thyroid',
            'Weight, metabolic panel and EPS/akathisia checks with antipsychotics'
        ]
    },
    {
        id: 'acute-mania',
        title: 'Acute mania management',
        icon: '🔥',
        tags: ['Mood', 'Emergency', 'High risk'],
        summary: 'Elevated/irritable mood with reduced sleep, pressured speech, risky behaviour and possible psychosis requiring rapid containment.',
        distinguishing: [
            'Abrupt escalation of activity, disinhibition, reduced need for sleep',
            'Check for antidepressant/substance triggers and ensure physical health causes excluded'
        ],
        firstLine: [
            'Stop antidepressants; start atypical antipsychotic with rapid titration (olanzapine 10–20mg, quetiapine 300–750mg, risperidone 2–6mg)',
            'Short-course benzodiazepine for severe agitation/insomnia (lorazepam 0.5–2mg PRN) plus de-escalation and safe environment'
        ],
        secondLine: [
            'Add lithium aiming 0.8–1.0 mmol/L or sodium valproate 500–2000mg/day if no contraindication',
            'Haloperidol 2.5–10mg short term if atypicals unsuitable; consider ECT for refractory or life-threatening states'
        ],
        investigations: [
            'Baseline U&Es, LFTs, CBC, TFTs, weight/BMI, pregnancy test where relevant, ECG (QTc)',
            'Drug/alcohol screen, temperature and glucose to exclude delirium or infection'
        ],
        crisis: [
            'High risk for harm/neglect—use rapid tranquillisation protocols under senior supervision and least restrictive detention if needed',
            'Safeguard finances, dependants and driving; remove access to means during de-escalation'
        ],
        monitoring: [
            'Daily review of mental state, vitals and side effects; track fluid intake if on lithium',
            'Arrange step-down to mood stabiliser maintenance plan and psychoeducation once settled'
        ]
    },
    {
        id: 'psychosis',
        title: 'Schizophrenia spectrum & psychosis',
        icon: '🌀',
        tags: ['Psychosis', 'High risk'],
        summary: '≥6 months psychosis with functional decline; hallucinations, delusions, disorganised speech/behaviour.',
        distinguishing: [
            'Negative symptoms and formal thought disorder',
            'Rule out substance/medical causes (thyroid, autoimmune, seizures)'
        ],
        firstLine: [
            'Atypical antipsychotic (e.g., risperidone 2–6mg, olanzapine 5–20mg, aripiprazole 10–30mg) + psychoeducation and social support',
            'Early intervention team, address adherence and substance use'
        ],
        secondLine: [
            'Switch antipsychotic; use long-acting injectable for adherence (paliperidone, aripiprazole, risperidone)',
            'Clozapine after two adequate trials; ECT for catatonia where appropriate'
        ],
        investigations: [
            'CBC, CMP, fasting glucose/lipids, prolactin if symptomatic',
            'ECG for QT risk; weight/BMI/waist circumference, EPS monitoring'
        ],
        crisis: [
            'Assess risk to self/others or grave disability; formal capacity review',
            'Use least restrictive detention with time limits and appeal rights'
        ],
        monitoring: [
            'Metabolic monitoring baseline, 3 months, then at least annually',
            'Clozapine: weekly to monthly FBC, myocarditis risk education'
        ]
    },
    {
        id: 'schizoaffective',
        title: 'Schizoaffective disorder',
        icon: '🌈',
        tags: ['Psychosis', 'Mood', 'Long-term'],
        summary: 'Episodes of psychosis with prominent mood symptoms (depressive or manic) for substantial portion of illness course plus ≥2 weeks psychosis without mood.',
        distinguishing: [
            'History of psychosis plus sustained mood syndromes',
            'Exclude substance-induced psychosis and bipolar with psychotic features (psychosis only during mood episodes)'
        ],
        firstLine: [
            'Atypical antipsychotic (paliperidone, risperidone, quetiapine) with psychoeducation and family intervention',
            'Add mood stabiliser (lithium/valproate) for manic subtype or SSRI for depressive subtype when psychosis controlled'
        ],
        secondLine: [
            'Switch to alternative antipsychotic or LAI for adherence',
            'Clozapine for treatment-resistant cases; ECT for catatonia or severe affective symptoms'
        ],
        investigations: [
            'Baseline metabolic panel, prolactin, weight/BMI/waist, ECG for QTc',
            'Lithium/valproate baselines if added; pregnancy test prior to teratogenic agents'
        ],
        crisis: [
            'Escalate if suicidality, self-neglect, or aggression; assess capacity and consider least restrictive detention',
            'Plan safeguarding, relapse signatures, and depot options early'
        ],
        monitoring: [
            'Regular metabolic monitoring and EPS review; lithium level checks where used',
            'Track relapse triggers and medication adherence; coordinated community follow-up'
        ]
    },
    {
        id: 'gad',
        title: 'Generalised anxiety disorder',
        icon: '🌊',
        tags: ['Anxiety'],
        summary: 'Excessive, hard-to-control worry ≥6 months with muscle tension, restlessness, sleep disturbance.',
        distinguishing: [
            'Worry not limited to specific triggers; somatic tension prominent',
            'Exclude hyperthyroidism, arrhythmia, substance/medication causes'
        ],
        firstLine: [
            'SSRI/SNRI plus CBT (worry exposure, cognitive restructuring)',
            'Sertraline 50–150mg, escitalopram 10–20mg, or venlafaxine XR 75–225mg; pregabalin 150–600mg/day if SSRI not tolerated',
            'Sleep hygiene, graded activity, limit caffeine and stimulants'
        ],
        secondLine: [
            'Buspirone 10–30mg TDS or pregabalin titration; switch SSRI/SNRI',
            'Short hydroxyzine course only if appropriate; avoid long-term benzodiazepines'
        ],
        investigations: [
            'TSH, CBC, CMP as indicated; substance use screen',
            'Consider GAD-7 for monitoring response'
        ],
        crisis: [
            'Escalate if suicidality, severe functional shutdown or safeguarding concerns',
            'Rarely requires detention unless acute safety risk'
        ],
        monitoring: [
            'Review 2–4 weekly during titration then 3 monthly',
            'Psychological therapy adherence and coping plan review'
        ]
    },
    {
        id: 'panic',
        title: 'Panic disorder ± agoraphobia',
        icon: '⏱️',
        tags: ['Anxiety'],
        summary: 'Recurrent unexpected panic attacks with fear/avoidance of future attacks; may develop agoraphobia.',
        distinguishing: [
            'Abrupt surges of intense fear with autonomic symptoms',
            'Differentiate from arrhythmia, asthma, hypoglycaemia, seizures'
        ],
        firstLine: [
            'SSRI/SNRI and CBT with interoceptive exposure',
            'Sertraline/paroxetine typical starter doses; consider propranolol 10–40mg PRN for performance triggers',
            'Breathing retraining and graded exposure for agoraphobia'
        ],
        secondLine: [
            'Switch SSRI/SNRI; brief benzodiazepine bridge only if necessary',
            'Phenelzine specialist use if multiple SSRI/SNRI failures; intensify CBT or refer for specialist therapy'
        ],
        investigations: [
            'ECG, TSH, glucose, CBC/CMP; urine toxicology if substance use suspected',
            'Assess caffeine/nicotine use and stimulant medications'
        ],
        crisis: [
            'Consider acute treatment plan if severe avoidance impairs nutrition/hydration',
            'Detention uncommon—focus on safety and exposure support'
        ],
        monitoring: [
            'Track frequency/severity of attacks; panic diary',
            'Reassess after 8–12 weeks of optimal therapy'
        ]
    },
    {
        id: 'social-anxiety',
        title: 'Social anxiety disorder',
        icon: '🙈',
        tags: ['Anxiety'],
        summary: 'Marked fear of social scrutiny/performance situations leading to avoidance and functional impairment.',
        distinguishing: [
            'Fear of embarrassment/judgement across conversations, meetings, presentations',
            'Performance-only subtype responds well to situational beta-blockers'
        ],
        firstLine: [
            'CBT focused on exposure, behavioural experiments and cognitive restructuring',
            'SSRI: sertraline 50–150mg or paroxetine 20–50mg; propranolol 10–40mg 30–60 minutes pre-performance for presentations'
        ],
        secondLine: [
            'Venlafaxine XR 75–225mg or pregabalin 150–600mg/day if SSRI not tolerated',
            'Phenelzine or moclobemide in specialist care for refractory cases'
        ],
        investigations: [
            'Screen for thyroid dysfunction, substance/stimulant use, and depressive comorbidity',
            'Baseline BP/HR if beta-blocker prescribed'
        ],
        crisis: [
            'Escalate if comorbid depression with suicidality or severe avoidance causing malnutrition/work loss',
            'Provide graded exposure plan and safety-netting for medication side effects'
        ],
        monitoring: [
            'Use LSAS or SPIN to track severity; review every 4–6 weeks during titration',
            'Check adherence and practice of exposure tasks at each review'
        ]
    },
    {
        id: 'illness-anxiety',
        title: 'Illness anxiety / health anxiety',
        icon: '🩺',
        tags: ['Anxiety', 'Somatic'],
        summary: 'Preoccupation with having/acquiring serious illness despite minimal symptoms and repeated normal evaluations.',
        distinguishing: [
            'Persistent health-related checking or reassurance-seeking',
            'Symptoms disproportionate to findings; significant time spent online or attending multiple providers'
        ],
        firstLine: [
            'CBT targeting catastrophic misinterpretation and response prevention to reduce reassurance-seeking',
            'SSRIs (sertraline/citalopram) at anxiety doses; schedule regular GP follow-up rather than symptom-triggered visits'
        ],
        secondLine: [
            'SNRIs (venlafaxine/duloxetine) if SSRI ineffective',
            'Mindfulness-based therapy or group psychoeducation programmes'
        ],
        investigations: [
            'Focused examination and limited baseline tests guided by history to avoid iatrogenic over-investigation',
            'Document shared plan on when to re-investigate red flags'
        ],
        crisis: [
            'Rarely needs emergency input unless comorbid depression/suicidality',
            'Provide clear safety-netting for new objective signs (weight loss, fever, bleeding)'
        ],
        monitoring: [
            'Track reassurance-seeking frequency and functional impact',
            'Review every 4–8 weeks during medication titration and therapy blocks'
        ]
    },
    {
        id: 'ptsd',
        title: 'Post-traumatic stress disorder',
        icon: '🛡️',
        tags: ['Trauma'],
        summary: 'Trauma exposure with intrusion, avoidance, negative cognition/mood, and hyperarousal >1 month.',
        distinguishing: [
            'Clear trauma link with re-experiencing and avoidance clusters',
            'Differentiate from complex grief, moral injury, TBI'
        ],
        firstLine: [
            'Trauma-focused psychotherapy (TF-CBT/EMDR)',
            'SSRI/SNRI for persistent symptoms; sertraline/paroxetine licensed in many regions; sleep and nightmare management'
        ],
        secondLine: [
            'Alternative SSRI/SNRI; prazosin 1–6mg nocte for nightmares where suitable',
            'Specialist trauma programmes for complex presentations'
        ],
        investigations: [
            'Medication-driven labs; screen for TBI, pain, substance use',
            'Monitor BP with prazosin; consider sleep/actigraphy review'
        ],
        crisis: [
            'Escalate if suicidality, dissociation with wandering, or safeguarding issues',
            'Detain only with acute risk; prioritise trauma-informed approach'
        ],
        monitoring: [
            'Use PCL-5 or similar to track change',
            'Plan relapse-prevention strategies and grounding skills'
        ]
    },
    {
        id: 'ocd',
        title: 'Obsessive-compulsive disorder',
        icon: '🔁',
        tags: ['Anxiety'],
        summary: 'Intrusive obsessions with compulsions to reduce anxiety; insight varies.',
        distinguishing: [
            'Time-consuming rituals (>1 hour/day) with ego-dystonic thoughts',
            'Differentiate from psychosis and autism-related routines'
        ],
        firstLine: [
            'High-dose SSRI (fluoxetine up to 60–80mg, sertraline up to 200mg) plus CBT with exposure and response prevention',
            'Address family accommodation and ritual interference'
        ],
        secondLine: [
            'Switch SSRI or clomipramine (titrate 25–250mg) with ECG monitoring; augment with atypical antipsychotic in select cases',
            'Intensive ERP programmes for severe cases'
        ],
        investigations: [
            'ECG if clomipramine; monitor sodium with SSRIs in older adults',
            'Y-BOCS for severity tracking'
        ],
        crisis: [
            'Detain rarely—consider only if self-neglect or severe risk from rituals',
            'Support nutritional/hydration needs when rituals interfere'
        ],
        monitoring: [
            'Review after 6–12 weeks at therapeutic SSRI dose',
            'Track ritual duration, interference, and functional gains'
        ]
    },
    {
        id: 'adhd',
        title: 'ADHD (adult)',
        icon: '🎯',
        tags: ['Attention', 'Neurodevelopmental'],
        summary: 'Inattention and/or hyperactivity-impulsivity across settings since childhood causing impairment.',
        distinguishing: [
            'Developmental history, executive dysfunction; differentiate from anxiety/depression burnout',
            'Screen for sleep disorders and substance use'
        ],
        firstLine: [
            'Stimulants (methylphenidate IR/OROS 5–72mg/day or lisdexamfetamine 30–70mg) where suitable or atomoxetine 40–100mg',
            'Psychoeducation, organisational strategies, workplace adjustments'
        ],
        secondLine: [
            'Switch stimulant class or atomoxetine; consider guanfacine ER 1–7mg',
            'Coaching and cognitive-behavioural approaches for adults'
        ],
        investigations: [
            'Baseline vitals/weight, cardiac history; ECG if cardiac risk',
            'BP/HR monitoring during titration; consider sleep study if indicated'
        ],
        crisis: [
            'Not typically applicable; focus on diversion risk and misuse prevention',
            'Plan controlled-substance agreements where relevant'
        ],
        monitoring: [
            'Frequent reviews during titration then at least 6–12 monthly',
            'Monitor appetite, sleep, cardiovascular status and diversion risk'
        ]
    },
    {
        id: 'eating',
        title: 'Eating disorders (AN/BN/ARFID)',
        icon: '🥗',
        tags: ['Feeding', 'High risk'],
        summary: 'Restriction with low weight/fear of weight gain (AN); binge–purge at normal weight (BN); restrictive intake without weight/shape concern (ARFID).',
        distinguishing: [
            'Weight trajectory, compensatory behaviours, bradycardia/hypotension',
            'ARFID linked to sensory/aversive triggers rather than shape concern'
        ],
        firstLine: [
            'AN: nutritional rehabilitation + psychotherapy (FBT, CBT-E)',
            'BN: CBT-E + high-dose fluoxetine 60mg; ARFID: exposure-based dietetic support'
        ],
        secondLine: [
            'BN: alternative SSRI/SNRI or therapy intensification',
            'AN/ARFID: specialist-led psychotherapy; consider olanzapine 2.5–10mg for anxiety around weight gain'
        ],
        investigations: [
            'CBC, CMP, Mg/Phos, Ca, LFTs, glucose, ECG (QT risk), vitals, weight/BMI/orthostatics',
            'Pregnancy test if relevant; bone density in prolonged AN'
        ],
        crisis: [
            'Admit for medical instability (bradycardia, electrolyte disturbance, syncope)',
            'Detain if life-threatening malnutrition with impaired capacity; senior review'
        ],
        monitoring: [
            'Monitor weight, vitals, electrolytes during refeeding',
            'Watch for refeeding syndrome; gradual caloric increases'
        ]
    },
    {
        id: 'perinatal',
        title: 'Perinatal mood & psychosis',
        icon: '🤱',
        tags: ['Perinatal', 'High risk'],
        summary: 'Depression/anxiety during pregnancy or postpartum; postpartum psychosis with rapid onset mood/psychotic symptoms.',
        distinguishing: [
            'Onset in pregnancy or within weeks postpartum',
            'Personal/family bipolar history increases PP psychosis risk'
        ],
        firstLine: [
            'Psychological therapies first-line for mild–moderate symptoms',
            'SSRIs with best safety data (sertraline 50–150mg) if medication needed; involve perinatal team'
        ],
        secondLine: [
            'Augment with atypical antipsychotic for severe depression/psychosis under specialist care',
            'Mood stabiliser prophylaxis (e.g., lithium aiming 0.6–0.8 mmol/L) for high-risk postpartum with close monitoring'
        ],
        investigations: [
            'Medication-specific labs (e.g., lithium levels/renal/thyroid)',
            'Infant monitoring plans when breastfeeding; ECG if QT-prolonging agents'
        ],
        crisis: [
            'Postpartum psychosis is an emergency—urgent same-day psychiatric review',
            'Safeguarding for infant; consider mother-baby unit where available'
        ],
        monitoring: [
            'Frequent contact in first 2 weeks postpartum; relapse plan',
            'Coordinate obstetric, paediatric and psychiatric follow-up'
        ]
    },
    {
        id: 'substance',
        title: 'Alcohol & substance use disorders',
        icon: '🍃',
        tags: ['Substance', 'Medical'],
        summary: 'Problematic use causing harm/dependence with tolerance, withdrawal, craving and loss of control.',
        distinguishing: [
            'Assess pattern, withdrawal history, complications (seizures/DTs)',
            'Screen co-occurring mood/anxiety, liver disease, infections'
        ],
        firstLine: [
            'Motivational interviewing, relapse-prevention planning',
            'Alcohol: parenteral then oral thiamine, consider acamprosate 666mg TDS or disulfiram 200–500mg post-detox; opioids: buprenorphine/methadone maintenance'
        ],
        secondLine: [
            'Extended-release naltrexone 380mg IM monthly or oral 50mg where suitable; psychological relapse-prevention programmes',
            'Dual-diagnosis input for coexisting psychiatric illness'
        ],
        investigations: [
            'LFTs, FBC (MCV), U&Es, glucose; viral hepatitis/HIV screen where indicated',
            'CIWA-Ar for alcohol withdrawal; urine drug screens for monitoring'
        ],
        crisis: [
            'Admit for severe withdrawal (history of DTs/seizures), Wernicke’s risk or polysubstance toxicity',
            'Safeguarding for dependants; consider capacity around intoxication'
        ],
        monitoring: [
            'Monitor withdrawal scores and vitals during detox',
            'Regular review of cravings, lapses, and medication adherence'
        ]
    },
    {
        id: 'delirium',
        title: 'Delirium (acute confusional state)',
        icon: '🚨',
        tags: ['Neurocognitive', 'Emergency'],
        summary: 'Acute fluctuating inattention and altered awareness; often medically precipitated.',
        distinguishing: [
            'Rapid onset, fluctuating course, disorganised thinking or hallucinations',
            'Look for infection, metabolic issues, drug effects, pain or constipation'
        ],
        firstLine: [
            'Treat underlying cause, optimise hydration and orientation',
            'Non-pharmacological strategies: sleep/wake cycle, sensory aids, family presence'
        ],
        secondLine: [
            'Low-dose haloperidol 0.5–1mg or atypical antipsychotic short term if severe agitation/risk',
            'Avoid benzodiazepines except alcohol/benzo withdrawal'
        ],
        investigations: [
            'CBC, CMP, CRP, glucose, ABG, cultures; CXR/urine as indicated',
            'Cognitive baseline, collateral history; consider CT head if focal neurology'
        ],
        crisis: [
            'Escalate for severe agitation risking harm—liaise with delirium/liaison team',
            'Capacity can fluctuate; document best interests decisions'
        ],
        monitoring: [
            'Use 4AT or CAM daily; review meds and restraints frequently',
            'Prevent complications: pressure areas, falls, aspiration'
        ]
    },
    {
        id: 'borderline',
        title: 'Emotionally unstable (borderline) personality disorder',
        icon: '🌗',
        tags: ['Personality', 'Psychotherapy'],
        summary: 'Instability of mood, self-image and relationships with impulsivity and chronic emptiness.',
        distinguishing: [
            'Rapidly shifting affect, recurrent self-harm, fear of abandonment',
            'Differentiate from bipolar (longitudinal course, triggers)'
        ],
        firstLine: [
            'Structured psychological therapies (DBT/MBT/STEPPS)',
            'Crisis planning, emotion regulation skills, validate distress'
        ],
        secondLine: [
            'Medications target comorbidities; avoid polypharmacy and long-term benzodiazepines',
            'Short-term antipsychotic (quetiapine/olanzapine) may help severe impulsivity with specialist review'
        ],
        investigations: [
            'Risk assessment, substance use review, screen for PTSD/ADHD overlap',
            'Physical health monitoring if antipsychotics/antidepressants used'
        ],
        crisis: [
            'Use collaborative safety plans; short admissions only if unavoidable',
            'Offer 24–48h crisis review rather than prolonged inpatient stays'
        ],
        monitoring: [
            'Track self-harm frequency, crisis contacts, therapy engagement',
            'Review medication necessity regularly to deprescribe where possible'
        ]
    },
    {
        id: 'insomnia',
        title: 'Insomnia disorder',
        icon: '😴',
        tags: ['Sleep'],
        summary: 'Difficulty initiating/maintaining sleep ≥3 nights/week for ≥3 months with daytime impairment.',
        distinguishing: [
            'Assess sleep hygiene, shift work, pain, restless legs, sleep apnoea',
            'Differentiate from circadian rhythm disorders and substance effects'
        ],
        firstLine: [
            'CBT-I (stimulus control, sleep restriction, cognitive strategies)',
            'Sleep hygiene: consistent schedule, limit caffeine/alcohol, screen reduction'
        ],
        secondLine: [
            'Short course sedative-hypnotic only if CBT-I unavailable (lowest dose, briefest duration) e.g., zopiclone 3.75–7.5mg',
            'Consider melatonin 2–5mg in older adults; address comorbid depression/anxiety'
        ],
        investigations: [
            'Screen for OSA (STOP-BANG), thyroid dysfunction, iron studies if restless legs',
            'Medication/substance review (caffeine, stimulants, steroids)'
        ],
        crisis: [
            'Rarely emergency—manage safety if severe sleep deprivation with psychosis risk',
            'Avoid driving or high-risk tasks until stabilised'
        ],
        monitoring: [
            'Sleep diary, wearable data where available',
            'Reassess after 4–6 weeks of behavioural intervention'
        ]
    },
    {
        id: 'uk-mental-health-law',
        title: 'UK & Northern Ireland mental health law',
        icon: '⚖️',
        tags: ['Legal', 'High risk', 'Safeguarding'],
        summary: 'Quick reference for detention, deprivation of liberty and police powers across UK nations and Northern Ireland.',
        distinguishing: [
            'England/Wales: Mental Health Act 1983 (as amended) and Mental Capacity Act 2005; NI: Mental Health (Northern Ireland) Order 1986 plus MCA (NI) 2016',
            'Always document capacity, least restrictive option, consultation with nearest relative/nominee, and right to appeal'
        ],
        firstLine: [
            'England/Wales detention: Section 2 (assessment up to 28d, 2 doctors + AMHP), Section 3 (treatment up to 6mo, renewable), Section 4 emergency (72h, 1 doctor + AMHP), Section 5(2)/(4) holding powers in hospital; CTOs under Section 17A with recall.',
            'Northern Ireland detention: Article 4 admission for assessment (up to 14d with 2 medical recommendations + ASW/nearest relative application), Article 12 detention for treatment (up to 6mo, renewable), Article 7 emergency (48h by a medical practitioner), guardianship alternatives under Article 15.'
        ],
        secondLine: [
            'Deprivation of liberty (England/Wales): MCA 2005 Schedule A1 DoLS or forthcoming LPS—requires lack of capacity, best interests, necessity/proportionality; supervisory body authorises, person/representative may challenge via Court of Protection.',
            'Deprivation of liberty (Northern Ireland): MCA (NI) 2016 DoLS—care plan must show lack of capacity, best interests and least restriction; Trust panel authorises, offers IMCA, and access to Review Tribunal for appeal.'
        ],
        investigations: [
            'Record capacity assessment, reasons alternatives are unsuitable, consultation with nearest relative/nominee and views of carers.',
            'Ensure medical recommendations, AMHP/ASW applications, authorisation forms and rights information are filed in notes.'
        ],
        crisis: [
            'Police powers (England/Wales): Section 136 remove from public place to a health-based place of safety (max 24h +12h extension); Section 135 warrant to enter private premises with AMHP/doctor to remove to place of safety.',
            'Police powers (Northern Ireland): Mental Health (NI) Order Article 129 removal from public place to place of safety (up to 24h); Article 130 warrant to enter and remove from private premises with medical practitioner/ASW involvement; notify on-call psychiatry immediately.'
        ],
        monitoring: [
            'On admission give rights information, offer IMHA/IMCA, and document consent to treatment safeguards (e.g., SOAD after 3 months Section 58).',
            'Track detention/authorisation expiry dates, tribunal/hearing timelines, and regular capacity reviews to move to least restrictive care.'
        ]
    },
    {
        id: 'capgras',
        title: 'Capgras syndrome',
        icon: '👥',
        tags: ['Psychosis', 'Delusional'],
        summary: 'Delusional belief that a person (usually close family) has been replaced by an identical-looking impostor.',
        distinguishing: [
            'Preserved recognition of facial features but conviction the person is different',
            'Often occurs in schizophrenia, dementia (especially Lewy body), or brain injury; can follow stroke or epilepsy',
            'Differentiate from prosopagnosia (facial recognition deficit without delusion)'
        ],
        firstLine: [
            'Treat underlying condition (antipsychotics for psychosis, cholinesterase inhibitors for dementia)',
            'Atypical antipsychotic (risperidone 1–4mg, olanzapine 5–15mg) with psychoeducation for family',
            'Avoid confrontation; validate distress while gently reality-testing'
        ],
        secondLine: [
            'Switch antipsychotic or add mood stabiliser if affective component',
            'Consider neuroimaging if new onset or atypical features (CT/MRI for structural lesions)'
        ],
        investigations: [
            'Cognitive assessment (MMSE/MoCA), medication review, exclude delirium',
            'Neuroimaging (CT/MRI) if acute onset, focal signs, or head trauma history',
            'Screen for Lewy body dementia features (visual hallucinations, parkinsonism, REM sleep behaviour)'
        ],
        crisis: [
            'Risk of harm to "impostor" if aggression develops—safety plan and close monitoring',
            'Consider admission if severe distress, violence risk, or inability to care for self'
        ],
        monitoring: [
            'Track delusional intensity and behavioural response',
            'Monitor antipsychotic side effects and cognitive trajectory; coordinate neurology/dementia team if indicated'
        ]
    },
    {
        id: 'cotard',
        title: 'Cotard syndrome (délire de négation)',
        icon: '💀',
        tags: ['Psychosis', 'Delusional', 'High risk'],
        summary: 'Nihilistic delusion that one is dead, does not exist, or has lost organs/blood; often with severe depression.',
        distinguishing: [
            'Belief in being dead or rotting, denial of existence, nihilistic themes',
            'Commonly seen in severe psychotic depression, schizophrenia, or neurological disease (stroke, epilepsy, brain tumour)',
            'High suicide risk due to belief death has already occurred'
        ],
        firstLine: [
            'Urgent psychiatric assessment—treat underlying severe depression or psychosis',
            'ECT often most effective for severe psychotic depression with Cotard features',
            'Atypical antipsychotic (olanzapine 10–20mg, quetiapine 300–600mg) plus antidepressant (venlafaxine 150–225mg, mirtazapine 30–45mg)'
        ],
        secondLine: [
            'Combination antidepressant-antipsychotic or mood stabiliser if bipolar spectrum',
            'Repeat ECT course if initial response incomplete; consider maintenance ECT'
        ],
        investigations: [
            'CBC, CMP, TFTs, B12/folate, syphilis serology, HIV if indicated',
            'Neuroimaging (CT/MRI) to exclude stroke, tumour, or focal lesions',
            'EEG if seizure history or atypical presentation'
        ],
        crisis: [
            'High suicide risk - admit for close observation and rapid treatment',
            'May refuse food/fluids believing they do not need them or are already dead - monitor nutrition and hydration',
            'Detention likely required; document capacity impairment and best-interests rationale'
        ],
        monitoring: [
            'Daily mental state review during acute phase; track suicidal ideation and self-neglect',
            'Monitor ECG if on antipsychotic-antidepressant combinations (QTc prolongation risk)'
        ]
    },
    {
        id: 'de-clerambault',
        title: 'De Clérambault syndrome (Erotomania)',
        icon: '💕',
        tags: ['Psychosis', 'Delusional'],
        summary: 'Delusional belief that another person (often of higher status or celebrity) is in love with them.',
        distinguishing: [
            'Fixed belief that someone (usually unattainable) loves them and is sending secret signals',
            'Patient interprets neutral or rejecting behaviour as proof of concealed love',
            'Can occur as primary disorder or secondary to schizophrenia, bipolar mania, or organic brain disease'
        ],
        firstLine: [
            'Atypical antipsychotic (risperidone 2–6mg, olanzapine 10–20mg, aripiprazole 10–30mg)',
            'Psychoeducation and gentle reality-testing; no confrontation which may worsen',
            'Risk assessment for stalking behaviour toward object of delusion'
        ],
        secondLine: [
            'Clozapine for treatment-resistant cases; pimozide historically used but QT-prolonging',
            'Mood stabiliser (lithium/valproate) if bipolar features; antidepressant if depressive component'
        ],
        investigations: [
            'Cognitive screen, substance use review, thyroid function',
            'ECG before pimozide or if multiple QT-prolonging agents; neuroimaging if organic cause suspected',
            'Collateral history for stalking, harassment, or threats'
        ],
        crisis: [
            'Escalate if stalking, threats, or approach behaviour toward object of delusion',
            'Liaise with police/legal if harassment or safeguarding concerns; may need restraining order',
            'Detention if risk to public or lack of insight prevents voluntary treatment'
        ],
        monitoring: [
            'Track delusional preoccupation and associated behaviours (letters, visits, online activity)',
            'Monitor antipsychotic side effects; coordinate with forensic team if legal issues arise'
        ]
    },
    {
        id: 'fregoli',
        title: 'Fregoli delusion',
        icon: '🎭',
        tags: ['Psychosis', 'Delusional'],
        summary: 'Delusional belief that different people are actually the same person in disguise, often a persecutor.',
        distinguishing: [
            'Patient believes strangers are familiar person(s) disguised or shape-shifting',
            'Opposite of Capgras (which involves replacement); Fregoli involves disguise/transformation',
            'Associated with schizophrenia, dementia, brain injury, or delirium'
        ],
        firstLine: [
            'Treat underlying psychotic disorder or organic cause',
            'Atypical antipsychotic (quetiapine 300–600mg, risperidone 2–6mg, olanzapine 10–20mg)',
            'Address paranoid ideation and fear of persecution if present'
        ],
        secondLine: [
            'Switch antipsychotic class or add mood stabiliser if mood component',
            'Neuroimaging (CT/MRI) if new onset, head trauma, or neurological signs'
        ],
        investigations: [
            'Cognitive assessment (MMSE/MoCA), exclude delirium and substance use',
            'Neuroimaging if acute onset, focal neurology, or post-trauma',
            'Review medications for anticholinergic or dopaminergic triggers'
        ],
        crisis: [
            'Risk of aggression toward perceived persecutors—safety planning essential',
            'Admission if violence risk, severe paranoia, or inability to function'
        ],
        monitoring: [
            'Track delusion intensity and paranoid features',
            'Monitor side effects of antipsychotics and cognitive trajectory; neurology review if structural cause'
        ]
    },
    {
        id: 'munchausen',
        title: 'Munchausen syndrome (factitious disorder)',
        icon: '🏥',
        tags: ['Somatic', 'Behavioural'],
        summary: 'Intentional feigning or production of physical/psychological symptoms to assume the sick role, without external incentives.',
        distinguishing: [
            'Repeated fabrication of illness with unnecessary medical procedures/admissions',
            'Differentiate from malingering (clear external gain like compensation) and somatic symptom disorder (genuine distress without conscious deception)',
            'Munchausen by proxy: fabrication of illness in another person (usually child)—safeguarding emergency'
        ],
        firstLine: [
            'Non-confrontational approach; acknowledge distress but avoid colluding with deception',
            'Communicate across healthcare teams to prevent repeated investigations and iatrogenic harm',
            'Offer psychiatric support focusing on underlying needs (trauma, attachment issues) rather than symptom validity'
        ],
        secondLine: [
            'Psychotherapy (CBT/psychodynamic) addressing trauma, self-esteem, and interpersonal patterns',
            'No specific pharmacological treatment; treat comorbid depression/anxiety/PTSD if present',
            'Set clear boundaries around future presentations and investigation thresholds'
        ],
        investigations: [
            'Review medical records across sites for pattern of presentations',
            'Exclude genuine medical conditions before diagnosis; ensure multidisciplinary discussion',
            'If Munchausen by proxy suspected: urgent safeguarding referral, paediatric review, and potential child protection order'
        ],
        crisis: [
            'Munchausen by proxy is child abuse—immediate safeguarding action, inform police and social services',
            'Self-harm risk if confronted or exposed; handle disclosure sensitively with psychiatric support available'
        ],
        monitoring: [
            'Coordinate care via single point of contact (e.g., GP or care coordinator)',
            'Document agreed care plan, red-flag symptoms for re-investigation, and frequency of reviews',
            'Monitor for escalation or shift to proxy behaviours if patient has dependants'
        ]
    },
    {
        id: 'othello',
        title: 'Othello syndrome (delusional jealousy)',
        icon: '💔',
        tags: ['Psychosis', 'Delusional', 'High risk'],
        summary: 'Delusional belief that partner is unfaithful despite lack of evidence; high risk of violence toward partner.',
        distinguishing: [
            'Irrational, unshakeable conviction of infidelity with seeking "proof" (checking phones, following partner)',
            'Can be primary or secondary to schizophrenia, alcohol misuse, dementia, or brain injury',
            'Very high risk of intimate partner violence and homicide'
        ],
        firstLine: [
            'Urgent risk assessment—consider separation and safety planning for partner',
            'Atypical antipsychotic (risperidone 2–6mg, olanzapine 10–20mg, quetiapine 300–600mg)',
            'Treat underlying condition (alcohol detox/abstinence, antipsychotic for schizophrenia, dementia management)'
        ],
        secondLine: [
            'SSRI if obsessional component (fluoxetine 40–60mg, sertraline 100–200mg)',
            'Clozapine for treatment-resistant cases; lithium or valproate if mood instability',
            'Intensive monitoring and potentially admission if violence risk remains high'
        ],
        investigations: [
            'Collateral history from partner (safely, away from patient) regarding violence, threats, controlling behaviour',
            'Alcohol/substance screen; cognitive assessment; neuroimaging if organic cause suspected (dementia, stroke, head injury)',
            'Risk assessment tools (DASH, SARA) for domestic violence and stalking'
        ],
        crisis: [
            'High risk of intimate partner homicide—urgent safeguarding and MARAC referral',
            'Offer partner refuge/safety planning; liaise with police if imminent threat',
            'Detention under MHA if lacks insight and poses serious risk; consider restriction order if forensic involvement'
        ],
        monitoring: [
            'Frequent mental state and risk reviews; track delusional intensity and behaviour toward partner',
            'Coordinate with MARAC, probation, or forensic services if violence history',
            'Ensure safe communication channels with partner (separate appointments, third-party contact)'
        ]
    },
    {
        id: 'stockholm',
        title: 'Stockholm syndrome',
        icon: '🔗',
        tags: ['Trauma', 'Behavioural'],
        summary: 'Psychological response where hostage/abuse victim develops positive feelings or loyalty toward captor/abuser.',
        distinguishing: [
            'Not a formal psychiatric diagnosis; observed phenomenon in hostage situations, domestic violence, trafficking, cults',
            'Victim identifies with captor, defends them, or resists rescue efforts',
            'Thought to be survival mechanism—bonding reduces perceived threat and increases chance of survival'
        ],
        firstLine: [
            'Trauma-informed approach; avoid judgment or forced separation initially',
            'Build therapeutic alliance and safety; validate emotions while gently exploring ambivalence',
            'Psychoeducation about trauma bonding, power dynamics, and coercive control'
        ],
        secondLine: [
            'Trauma-focused therapy (TF-CBT, EMDR, phase-based trauma therapy) once safety established',
            'Address PTSD, complex PTSD, depression, or anxiety with evidence-based treatments',
            'SSRI/SNRI for comorbid PTSD or depression (sertraline 50–150mg, venlafaxine 75–225mg)'
        ],
        investigations: [
            'Comprehensive trauma history (may take time to disclose); screen for PTSD, depression, suicidality',
            'Physical health review for injuries, neglect, or chronic stress effects',
            'Safeguarding assessment; risk to others (e.g., children in household)'
        ],
        crisis: [
            'If immediate danger (domestic violence, trafficking, captivity): liaise with police, safeguarding, refuge services',
            'Victim may refuse help or return to abuser—document capacity, offer ongoing safety planning and harm reduction',
            'Children involved: mandatory safeguarding referral and child protection measures'
        ],
        monitoring: [
            'Long-term follow-up for PTSD, relationship patterns, and re-victimisation risk',
            'Support autonomy and agency; avoid coercive rescue which can mirror original trauma dynamics',
            'Coordinate with social services, domestic violence advocates, and legal support as needed'
        ]
    }
];
