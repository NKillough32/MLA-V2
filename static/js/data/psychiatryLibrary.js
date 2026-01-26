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
        id: 'schizotypal',
        title: 'Schizotypal personality disorder',
        icon: '🔮',
        tags: ['Personality', 'Cluster A'],
        summary: 'Odd beliefs, eccentric behavior, and social difficulties with magical thinking and unusual speech patterns.',
        distinguishing: [
            'Magical thinking and paranormal focus (e.g., discussing a "spirit guide")',
            'Odd or eccentric speech such as a high-pitched voice during consultation',
            'Beliefs are not necessarily fixed delusions; reality testing often partially intact',
            'Emotionally unstable personality disorder is unlikely without impulsivity, emptiness, volatile relationships, or repeated suicide attempts',
            'Histrionic personality disorder is unlikely without suggestibility, self-dramatisation, attention-seeking, or sexual seductiveness',
            'Schizoaffective disorder is unlikely without prior psychosis plus mania or depression',
            'Schizoid personality disorder is unlikely without social isolation, emotional coldness, or preference for solitary activities'
        ],
        firstLine: [
            'Supportive psychotherapy with social skills training',
            'Assess comorbid anxiety/depression and provide targeted treatment'
        ],
        secondLine: [
            'Low-dose antipsychotic for significant cognitive-perceptual symptoms',
            'Consider CBT to address suspiciousness and odd beliefs'
        ],
        investigations: [
            'Comprehensive psychiatric history and mental state examination',
            'Collateral history to confirm longstanding pattern and functional impact'
        ],
        crisis: [
            'Escalate if risk concerns or emerging psychosis',
            'Assess safeguarding and social support needs'
        ],
        monitoring: [
            'Track social functioning, occupational impact, and engagement with therapy',
            'Monitor for progression to psychotic disorders or mood episodes'
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
    },
    {
        id: 'catatonia',
        title: 'Catatonia',
        icon: '🧊',
        tags: ['Emergency', 'Psychosis', 'Medical', 'High risk'],
        summary: 'Psychomotor syndrome with stupor, mutism, rigidity, posturing or excitement; life-threatening if untreated.',
        distinguishing: [
            '≥3 of: stupor, catalepsy, waxy flexibility, mutism, negativism, posturing, mannerisms, stereotypy, agitation, grimacing, echolalia, echopraxia',
            'Can occur in schizophrenia, bipolar, depression, medical conditions (encephalitis, stroke, metabolic), or drug-induced (antipsychotics)',
            'Malignant catatonia: fever, autonomic instability, delirium - medical emergency with high mortality'
        ],
        firstLine: [
            'Stop antipsychotics immediately if drug-induced suspected',
            'Benzodiazepines: lorazepam 1-2mg IV/IM test dose (improvement in 5-10 minutes diagnostic); continue 2mg TDS-QDS',
            'Monitor vitals, hydration, nutrition; DVT prophylaxis; treat underlying medical cause'
        ],
        secondLine: [
            'ECT if benzodiazepines fail or malignant catatonia - often curative and life-saving',
            'NMDA antagonists (amantadine 200-400mg/day, memantine) as adjuncts in specialist care',
            'Restart antipsychotic cautiously once resolved if needed for psychosis'
        ],
        investigations: [
            'Bush-Francis Catatonia Rating Scale for diagnosis and monitoring',
            'CBC, CMP, CK (rhabdomyolysis), calcium, TFTs, LFTs, drug screen, blood cultures if febrile',
            'Neuroimaging (CT/MRI), LP if encephalitis suspected; EEG for non-convulsive status epilepticus'
        ],
        crisis: [
            'Malignant catatonia is psychiatric emergency - ICU transfer if autonomic instability, hyperthermia >38.5C, or rhabdomyolysis',
            'Aspiration risk with stupor - NBM, NG tube if needed, airway protection',
            'Immediate ECT if life-threatening; do not delay for consent in best interests'
        ],
        monitoring: [
            'Continuous vitals monitoring in acute phase; daily CK and electrolytes',
            'Bush-Francis scale daily; track oral intake, bowel movements, skin integrity',
            'Taper benzodiazepines slowly once resolved to prevent recurrence'
        ]
    },
    {
        id: 'nms',
        title: 'Neuroleptic malignant syndrome (NMS)',
        icon: '🔥',
        tags: ['Emergency', 'Medical', 'High risk', 'Iatrogenic'],
        summary: 'Life-threatening reaction to antipsychotics with fever, rigidity, altered mental status, autonomic dysfunction; 10-20% mortality.',
        distinguishing: [
            'Tetrad: hyperthermia (>38C), lead-pipe rigidity, altered consciousness, autonomic instability (tachycardia, labile BP, diaphoresis)',
            'Elevated CK (often >1000), leukocytosis; develops over 24-72 hours',
            'Differentiate from serotonin syndrome (hyperreflexia, clonus, diarrhea), malignant catatonia, heat stroke, infection'
        ],
        firstLine: [
            'STOP antipsychotic immediately; medical emergency - HDU/ICU admission',
            'Supportive care: IV fluids, cooling, treat hyperthermia and rhabdomyolysis',
            'Benzodiazepines for agitation and rigidity: lorazepam 1-2mg IV/IM; consider dantrolene 1-2.5mg/kg IV QDS or bromocriptine 2.5mg TDS PO'
        ],
        secondLine: [
            'ECT if severe or refractory cases, especially with catatonic features',
            'Dantrolene (muscle relaxant) 1-10mg/kg/day or bromocriptine (dopamine agonist) up to 45mg/day',
            'Plasmapheresis or dialysis if severe renal failure from rhabdomyolysis'
        ],
        investigations: [
            'CK (usually >1000, can be >10,000), CBC (leukocytosis), CMP (AKI from rhabdomyolysis), LFTs',
            'Myoglobin, urine output (risk of ATN); blood cultures, LP if infection suspected',
            'CT/MRI brain to exclude stroke, encephalitis; continuous cardiac monitoring'
        ],
        crisis: [
            'ICU admission for autonomic instability, hyperthermia >40C, severe rigidity, or AKI',
            'Aggressive IV hydration (6-12L/day) to prevent renal failure; urinary alkalinization if myoglobinuria',
            'Intubate and ventilate if respiratory compromise; external cooling, avoid antipyretics alone'
        ],
        monitoring: [
            'Continuous vitals, hourly neuro obs, strict fluid balance, daily CK until normalized',
            'Monitor renal function, electrolytes, temperature; watch for DIC, aspiration pneumonia',
            'Do not restart antipsychotic for 2 weeks minimum; if essential, use low-potency agent (quetiapine) at lowest dose with close monitoring'
        ]
    },
    {
        id: 'serotonin-syndrome',
        title: 'Serotonin syndrome',
        icon: '⚡',
        tags: ['Emergency', 'Medical', 'High risk', 'Iatrogenic'],
        summary: 'Potentially fatal condition from excess serotonergic activity; triad of mental status change, autonomic hyperactivity, neuromuscular abnormalities.',
        distinguishing: [
            'Hunter criteria: recent serotonergic agent PLUS (spontaneous clonus OR inducible clonus + agitation/diaphoresis OR ocular clonus + agitation/diaphoresis OR tremor + hyperreflexia OR hypertonia + temp>38C + ocular/inducible clonus)',
            'Rapid onset (hours) after dose increase or drug combination (e.g., SSRI + tramadol, SSRI + MAOI)',
            'Differentiate from NMS (slower onset, rigidity not clonus), anticholinergic toxicity, sympathomimetic toxicity'
        ],
        firstLine: [
            'STOP all serotonergic agents immediately',
            'Supportive care: IV fluids, benzodiazepines (diazepam 5-10mg IV) for agitation and muscle rigidity',
            'Cooling measures if hyperthermic; monitor vitals closely'
        ],
        secondLine: [
            'Cyproheptadine (5-HT antagonist) 12mg initial, then 2mg Q2H until improvement (max 32mg/day)',
            'Intubation and paralysis with non-depolarizing agents if severe hyperthermia (>41C) or respiratory failure',
            'Avoid succinylcholine (depolarizing) as can worsen hyperkalaemia from rhabdomyolysis'
        ],
        investigations: [
            'Clinical diagnosis (no specific test); CK, CMP, ABG, lactate',
            'Drug levels if applicable (lithium, TCAs); toxicology screen',
            'CT head if altered consciousness or seizures; continuous cardiac monitoring (QT prolongation risk)'
        ],
        crisis: [
            'Severe cases (temp >40C, seizures, rigidity): ICU admission, intubation, active cooling',
            'Risk of rhabdomyolysis, DIC, renal failure, ARDS, death if untreated',
            'Most resolve within 24 hours of stopping agents; MAOIs may take days due to long half-life'
        ],
        monitoring: [
            'Continuous vitals, temperature, neuro obs until resolution',
            'Monitor CK, renal function, electrolytes; watch for complications',
            'Restart serotonergic agents only after complete resolution (usually 2 weeks); avoid combinations that precipitated syndrome'
        ]
    },
    {
        id: 'dementia',
        title: 'Dementia (Alzheimer\'s, vascular, Lewy body, frontotemporal)',
        icon: '🧠',
        tags: ['Neurocognitive', 'Long-term', 'Geriatric'],
        summary: 'Progressive cognitive decline affecting memory, executive function, language, visuospatial skills; impacts daily function.',
        distinguishing: [
            'Alzheimer\'s: insidious onset, prominent memory loss, gradual progression',
            'Vascular: stepwise decline, focal deficits, vascular risk factors, MRI white matter changes',
            'Lewy body: fluctuating cognition, visual hallucinations, parkinsonism, REM sleep disorder',
            'Frontotemporal: early personality/behaviour change, disinhibition, language problems (semantic/non-fluent variants), younger onset (50-60s)'
        ],
        firstLine: [
            'Comprehensive assessment: cognitive testing (MMSE, MoCA, ACE-III), functional assessment (ADLs), collateral history',
            'Cholinesterase inhibitors for Alzheimer\'s/Lewy body: donepezil 5-10mg, rivastigmine 3-12mg, galantamine 8-24mg',
            'Memantine (NMDA antagonist) 10-20mg for moderate-severe Alzheimer\'s or if cholinesterase inhibitors not tolerated'
        ],
        secondLine: [
            'Combination donepezil + memantine for moderate-severe Alzheimer\'s',
            'Antipsychotics ONLY if severe BPSD with risk (short course, lowest dose); prefer quetiapine/aripiprazole over haloperidol; AVOID in Lewy body (severe sensitivity)',
            'SSRIs for depression/agitation: citalopram 10-20mg (caution QT), sertraline 25-100mg; avoid TCAs (anticholinergic)'
        ],
        investigations: [
            'Bloods: FBC, CMP, TFTs, B12/folate, calcium, glucose, syphilis/HIV (if indicated)',
            'Neuroimaging: MRI brain (atrophy patterns, vascular changes, exclude subdural, tumour); CT if MRI contraindicated',
            'Specialist: CSF biomarkers (Aβ42, tau), PET amyloid/FDG, genetic testing if early onset/family history'
        ],
        crisis: [
            'Delirium superimposed on dementia - common, worsens prognosis; treat underlying cause urgently',
            'Severe BPSD with aggression - multidisciplinary review, consider safeguarding, brief antipsychotic if unavoidable',
            'Wandering, getting lost - GPS trackers, safe return schemes, consider capacity for independent living'
        ],
        monitoring: [
            'Cognitive and functional assessment every 6-12 months; earlier if rapid decline',
            'Monitor cholinesterase inhibitor side effects: GI upset, bradycardia, syncope, nightmares',
            'Driving assessment (DVLA notification in UK); legal planning (LPA, advanced directives) while capacity retained'
        ]
    },
    {
        id: 'autism',
        title: 'Autism spectrum disorder (ASD)',
        icon: '🧩',
        tags: ['Neurodevelopmental', 'Long-term'],
        summary: 'Persistent deficits in social communication and interaction with restricted, repetitive patterns of behaviour/interests; lifelong condition.',
        distinguishing: [
            'Social communication: difficulty with social-emotional reciprocity, non-verbal communication, developing/maintaining relationships',
            'Restricted/repetitive: stereotyped movements, insistence on sameness, highly restricted interests, hyper/hypo-reactivity to sensory input',
            'Symptoms present from early development (though may not manifest until social demands exceed capacities); not better explained by intellectual disability'
        ],
        firstLine: [
            'Psychosocial interventions: social skills training, CBT adapted for autism, parent-mediated interventions (children)',
            'Environmental modifications: reduce sensory overload, clear communication, routine/structure',
            'No medication for core autism features; treat comorbidities (ADHD, anxiety, depression) as per guidelines'
        ],
        secondLine: [
            'Melatonin 2-10mg for sleep difficulties (common in ASD)',
            'SSRIs for anxiety/OCD (start low, go slow; increased sensitivity to side effects): sertraline 25-150mg, fluoxetine 10-40mg',
            'Antipsychotics (risperidone 0.5-3mg, aripiprazole 5-15mg) for severe aggression/self-injury in specialist care only - risk vs benefit discussion'
        ],
        investigations: [
            'Diagnostic assessment: ADOS-2, ADI-R, developmental/educational/occupational history, collateral from family/school/work',
            'Screen comorbidities: ADHD (50% comorbidity), anxiety (40%), depression, epilepsy (20-30%), GI issues',
            'Exclude hearing/vision impairment, genetic testing if dysmorphism/intellectual disability (fragile X, Rett, tuberous sclerosis)'
        ],
        crisis: [
            'Meltdowns vs tantrums: meltdowns are involuntary responses to overwhelm, not attention-seeking; remove from trigger, allow recovery in safe space',
            'Autistic burnout: chronic exhaustion from masking/social demands; requires rest, reduced demands, support',
            'Self-injury or aggression: functional assessment (communication, sensory, escape), modify environment, consider safeguarding'
        ],
        monitoring: [
            'Regular review of comorbidities and medication side effects',
            'Transition planning (education, employment, independent living); coordinate multi-agency support',
            'Monitor for exploitation/abuse (social vulnerability); mental capacity assessment for specific decisions if needed'
        ]
    },
    {
        id: 'bdd',
        title: 'Body dysmorphic disorder (BDD)',
        icon: '🪞',
        tags: ['Anxiety', 'Somatic'],
        summary: 'Preoccupation with perceived defect in appearance (not observable/slight to others) causing significant distress and repetitive behaviours.',
        distinguishing: [
            'Excessive concern about specific body part(s); repetitive behaviours (mirror checking, skin picking, reassurance seeking, camouflaging)',
            'Commonly face, skin, hair, nose; often presents to dermatology/plastic surgery not psychiatry',
            'Differentiate from eating disorders (BDD not weight/shape focused), OCD (BDD appearance-specific), psychosis (BDD usually has insight)'
        ],
        firstLine: [
            'CBT for BDD: exposure (reduce checking/reassurance), cognitive restructuring, perceptual retraining',
            'High-dose SSRI: fluoxetine 60-80mg, escitalopram 20-30mg, sertraline 150-200mg (higher than typical depression doses)',
            'Avoid cosmetic procedures - rarely improve symptoms, often worsen or shift focus to new "defect"'
        ],
        secondLine: [
            'Clomipramine 150-250mg if SSRIs fail (monitor ECG)',
            'Augment SSRI with atypical antipsychotic if poor insight/delusional conviction: aripiprazole 5-15mg, olanzapine 5-10mg',
            'Intensive CBT programmes or residential treatment for severe cases'
        ],
        investigations: [
            'Yale-Brown Obsessive Compulsive Scale modified for BDD (BDD-YBOCS)',
            'Screen for depression (50% comorbidity), social anxiety (common), suicidal ideation (high risk)',
            'No physical investigations unless genuinely indicated; document discussions with patient about avoiding unnecessary cosmetic consultations'
        ],
        crisis: [
            'Suicide risk high (45% lifetime attempt rate) - safety planning essential',
            'Social withdrawal, inability to work/study - functional impairment severe in untreated cases',
            'Repeated cosmetic procedures causing iatrogenic harm - communicate with patient\'s other clinicians to coordinate care'
        ],
        monitoring: [
            'BDD-YBOCS every 4-8 weeks during treatment',
            'Monitor time spent on appearance concerns, mirror checking, reassurance seeking, camouflaging',
            'Long-term follow-up; relapse common if treatment stopped prematurely'
        ]
    },
    {
        id: 'conversion',
        title: 'Conversion disorder (Functional neurological symptom disorder)',
        icon: '🔌',
        tags: ['Somatic', 'Neurology'],
        summary: 'Neurological symptoms (weakness, non-epileptic seizures, sensory loss, movement disorder) incompatible with known neurological disease.',
        distinguishing: [
            'Positive signs inconsistent with neurology: Hoover\'s sign, tremor entrainment, give-way weakness, non-dermatomal sensory loss',
            'Diagnosis requires positive functional features, not just exclusion of organic disease',
            'Often (but not always) preceded by psychological stressor; patients not "faking" - symptoms are real and involuntary'
        ],
        firstLine: [
            'Explain diagnosis clearly: "Your nervous system is sending incorrect signals; the hardware is intact but the software has a glitch"',
            'Physiotherapy/occupational therapy focused on retraining normal movement patterns and increasing activity',
            'CBT or psychodynamic therapy addressing psychological factors and illness beliefs'
        ],
        secondLine: [
            'Treat comorbid depression/anxiety with SSRIs if present',
            'Multidisciplinary rehabilitation programmes for severe/chronic cases',
            'Avoid iatrogenic harm from repeated investigations or invasive procedures'
        ],
        investigations: [
            'Sufficient neurology assessment to identify positive functional signs (do not over-investigate)',
            'EEG with video for functional seizures (normal ictal EEG, eyes closed, pelvic thrusting, prolonged, recall of event)',
            'Screen for depression, anxiety, PTSD, childhood trauma (higher prevalence but not always present)'
        ],
        crisis: [
            'Functional seizures in ED: move to safe space, do not restrain, reassure, do not give benzodiazepines/antiepileptics',
            'Severe functional weakness causing falls/injury: occupational therapy, falls prevention, ensure safety at home',
            'Avoid admissions if possible - iatrogenic harm, symptom reinforcement; outpatient management preferred'
        ],
        monitoring: [
            'Functional improvement (e.g., mobility, seizure frequency) more important than symptom resolution',
            'Coordinate neurology and psychiatry follow-up; clear communication with patient about plan',
            'Address illness beliefs and fear-avoidance; gradual return to normal activities'
        ]
    },
    {
        id: 'trichotillomania',
        title: 'Trichotillomania (hair-pulling disorder)',
        icon: '💇',
        tags: ['Anxiety', 'Behavioural'],
        summary: 'Recurrent pulling out of one\'s hair resulting in hair loss, with repeated attempts to stop; causes distress/impairment.',
        distinguishing: [
            'Hair pulling from scalp, eyebrows, eyelashes; patchy, irregular hair loss',
            'Often automatic (unconscious during other activities) or focused (in response to tension/urge)',
            'Differentiate from alopecia areata (smooth patches, no broken hairs), tinea capitis (scale, inflammation), compulsive habits vs OCD (ego-syntonic vs ego-dystonic)'
        ],
        firstLine: [
            'Habit-reversal training (HRT): awareness training, competing response, motivation',
            'CBT: stimulus control, urge management, cognitive restructuring',
            'N-acetylcysteine 1200-2400mg/day (evidence for reducing urges)'
        ],
        secondLine: [
            'SSRIs: clomipramine 100-250mg or fluoxetine 40-80mg if comorbid OCD/anxiety',
            'Acceptance and commitment therapy (ACT) or dialectical behaviour therapy (DBT)',
            'Consider referral to dermatology for scalp health and cosmetic options (wigs, camouflage)'
        ],
        investigations: [
            'Clinical diagnosis; no investigations needed unless atypical features',
            'Skin/scalp exam to differentiate from dermatological causes',
            'Screen for body-focused repetitive behaviours (skin-picking, nail-biting) and comorbid OCD, anxiety, depression'
        ],
        crisis: [
            'Rarely crisis presentation; significant psychosocial impairment (shame, social avoidance) may require intensive therapy',
            'Monitor for skin infections from repeated pulling or ingestion of hair (trichobezoar risk if trichophagia present)'
        ],
        monitoring: [
            'Track hair-pulling episodes, urges, and triggers; hair regrowth as marker of improvement',
            'Review every 4-8 weeks during active treatment; long-term follow-up often needed',
            'Relapse common - reinforce skills and resume therapy/medication as needed'
        ]
    },
    {
        id: 'excoriation',
        title: 'Excoriation disorder (skin-picking disorder)',
        icon: '🩹',
        tags: ['Anxiety', 'Behavioural'],
        summary: 'Recurrent skin-picking resulting in lesions, with repeated attempts to stop; causes distress/impairment.',
        distinguishing: [
            'Picking at healthy skin or minor irregularities (scabs, bumps, pimples); face, arms, hands most common',
            'Automatic (during other tasks) or focused (in response to urge/tension)',
            'Differentiate from dermatological conditions (dermatitis artefacta has more severe self-injury, psychosis has delusional component), OCD overlap'
        ],
        firstLine: [
            'Habit-reversal training (HRT) and stimulus control: identify triggers, competing response (e.g., clenched fists, fidget toy)',
            'CBT: urge surfing, cognitive restructuring, skin care routine as incompatible behaviour',
            'N-acetylcysteine 1200-2400mg/day'
        ],
        secondLine: [
            'SSRIs: fluoxetine 40-80mg or escitalopram 20-30mg (higher doses often needed)',
            'Augment with N-acetylcysteine or low-dose naltrexone 3-6mg if SSRIs insufficient',
            'Dermatology involvement for wound care, scar management, infection prevention'
        ],
        investigations: [
            'Clinical diagnosis; skin exam to assess lesions and exclude primary dermatological cause',
            'Screen for body-focused repetitive behaviours (trichotillomania, nail-biting) and comorbidities (OCD 20-30%, depression, anxiety)',
            'No routine investigations unless signs of infection'
        ],
        crisis: [
            'Severe tissue damage, infection (cellulitis, sepsis) - dermatology/surgical input',
            'Significant scarring and cosmetic concerns - psychological impact high, may need camouflage/laser therapy',
            'Rarely emergency; address shame and provide non-judgmental support'
        ],
        monitoring: [
            'Track picking episodes, lesions, and healing; photography can help monitor progress',
            'Review every 4-8 weeks; adjust therapy/medications as needed',
            'Long-term management often required; relapses common during stress'
        ]
    },
    {
        id: 'hoarding',
        title: 'Hoarding disorder',
        icon: '📦',
        tags: ['Anxiety', 'Safeguarding'],
        summary: 'Persistent difficulty discarding possessions regardless of value, resulting in clutter that impairs use of living spaces; distress if forced to discard.',
        distinguishing: [
            'Accumulation fills living areas, prevents normal use (can\'t cook in kitchen, sleep in bed, access bathroom)',
            'Emotional attachment to items, distress at discarding, excessive acquisition',
            'Differentiate from OCD (hoarding is comfort/safety vs unwanted intrusions), dementia (hoarding is lifelong pattern), squalor (lack of self-care vs inability to discard)'
        ],
        firstLine: [
            'Specialised CBT for hoarding: motivational interviewing, decision-making skills, exposure to discarding, relapse prevention',
            'Home visits or video to assess clutter severity (Clutter Image Rating)',
            'Address fire risk, pest infestation, structural damage - liaise with environmental health, social services'
        ],
        secondLine: [
            'SSRIs (venlafaxine 150-225mg, paroxetine 40-60mg) if comorbid depression/anxiety; limited evidence for core hoarding',
            'Group CBT programmes or peer support groups',
            'Cognitive remediation if executive dysfunction prominent'
        ],
        investigations: [
            'Clutter Image Rating Scale, Saving Inventory-Revised, hoarding impact on Activities of Daily Living',
            'Home visit or photos/video to assess severity and safety risks',
            'Screen for ADHD (impulsivity, disorganisation), OCD (30% comorbidity), depression, social isolation'
        ],
        crisis: [
            'Safeguarding: fire hazard, structural collapse risk, unsanitary conditions, vermin/insect infestation',
            'Self-neglect - inability to access kitchen, bathroom, bed; risk of falls, malnutrition',
            'Forced clearance worsens symptoms and damages therapeutic relationship - avoid unless imminent danger; work collaboratively with patient'
        ],
        monitoring: [
            'Clutter rating and functional impairment every 3-6 months',
            'Multi-agency approach: mental health, social services, environmental health, housing',
            'Long-term condition requiring sustained support; relapse common after clearance without addressing underlying issues'
        ]
    },
    {
        id: 'sad',
        title: 'Seasonal affective disorder (SAD)',
        icon: '☀️',
        tags: ['Mood', 'Seasonal'],
        summary: 'Recurrent major depressive episodes in winter months with full remission in spring/summer; atypical features common (hypersomnia, carbohydrate craving, weight gain).',
        distinguishing: [
            'Temporal pattern: onset October-November, remission March-April; ≥2 consecutive years',
            'Atypical depression features: increased sleep, increased appetite, carbohydrate craving, leaden paralysis',
            'Differentiate from winter exacerbation of chronic depression (year-round symptoms worse in winter vs complete summer remission)'
        ],
        firstLine: [
            'Light therapy: 10,000 lux lightbox for 30 minutes each morning (start September-October before symptom onset)',
            'CBT for SAD: behavioural activation, cognitive restructuring of seasonal thoughts, sleep scheduling',
            'Vitamin D supplementation (many with SAD have low levels): 1000-2000 IU daily'
        ],
        secondLine: [
            'SSRIs if light therapy insufficient: sertraline 50-150mg, fluoxetine 20-40mg, bupropion XL 150-300mg',
            'Combination light therapy + antidepressant for severe cases',
            'Dawn simulation (gradual bedroom light increase mimicking sunrise) as adjunct'
        ],
        investigations: [
            'Clinical diagnosis based on temporal pattern; symptom diary/mood chart over ≥2 years',
            'Vitamin D level (25-OH vitamin D); TFTs if hypothyroid symptoms',
            'PHQ-9 or similar to track severity; differentiate from bipolar (hypomanic episodes in summer suggest bipolar not SAD)'
        ],
        crisis: [
            'Severe depression with suicidality - treat as major depression, do not wait for light therapy',
            'Hospital admission rarely needed unless high suicide risk or psychotic features',
            'Plan ahead for next winter - start preventive light therapy and consider prophylactic antidepressant September-October'
        ],
        monitoring: [
            'Symptom tracking through winter; PHQ-9 every 2-4 weeks',
            'Monitor light therapy adherence (common to stop once feeling better, leading to relapse)',
            'Taper antidepressant in spring if used; restart prophylactically next autumn'
        ]
    },
    {
        id: 'pmdd',
        title: 'Premenstrual dysphoric disorder (PMDD)',
        icon: '📅',
        tags: ['Mood', 'Hormonal'],
        summary: 'Severe mood, behavioural, and physical symptoms in luteal phase (week before menses) with marked impairment; resolves within days of menstruation.',
        distinguishing: [
            '≥5 symptoms including ≥1 mood symptom (irritability, depressed mood, anxiety, mood swings) in most cycles for ≥1 year',
            'Symptoms peak in week before menses, improve within days of onset, minimal in follicular phase (week after menses)',
            'Differentiate from PMS (milder, no functional impairment), premenstrual exacerbation of depression/anxiety (symptoms present all month, worsen premenstrually)'
        ],
        firstLine: [
            'SSRIs (continuous or luteal-phase only): sertraline 50-150mg, fluoxetine 20-40mg, escitalopram 10-20mg',
            'Luteal-phase dosing: start SSRI day 14-16 of cycle, stop day 1-2 of menses (lower doses often effective)',
            'Lifestyle: regular exercise, sleep hygiene, limit caffeine/alcohol, stress management; symptom tracking (Daily Record of Severity of Problems - DRSP)'
        ],
        secondLine: [
            'Combined oral contraceptive (continuous or extended cycle to suppress ovulation): ethinylestradiol/drospirenone',
            'GnRH agonists (goserelin, leuprolide) to suppress ovulation - specialist use, add-back HRT to prevent bone loss',
            'CBT focused on PMDD-specific triggers and coping strategies'
        ],
        investigations: [
            'Prospective daily symptom diary for ≥2 menstrual cycles (DRSP) - essential for diagnosis',
            'No laboratory tests diagnose PMDD; TFTs if irregular cycles or hypothyroid symptoms',
            'Screen for comorbid depression, anxiety (50% comorbidity), trauma history'
        ],
        crisis: [
            'Suicidal ideation peaks in luteal phase - safety planning, crisis contacts, consider continuous SSRI',
            'Severe impulsivity/self-harm - close monitoring during high-risk week, involve partner/family in safety plan',
            'Work/relationship crisis from symptoms - psychoeducation for patient and family, workplace adjustments'
        ],
        monitoring: [
            'Continue DRSP to track treatment response; symptoms should improve by 2-3 cycles',
            'Review every 3-6 months; long-term management often needed until menopause',
            'If planning pregnancy: wean SSRI gradually, symptom improvement often occurs during pregnancy but relapse postpartum common'
        ]
    },
    {
        id: 'specific-phobia',
        title: 'Specific phobia',
        icon: '😨',
        tags: ['Anxiety'],
        summary: 'Marked, persistent, excessive fear of specific object/situation causing avoidance or intense distress; out of proportion to actual danger.',
        distinguishing: [
            'Common phobias: animals (dogs, spiders), natural environment (heights, storms), blood-injection-injury, situational (flying, enclosed spaces)',
            'Immediate anxiety response on exposure or anticipation; recognition fear is excessive (unless children)',
            'Differentiate from panic disorder (unexpected attacks), agoraphobia (multiple situations), social anxiety (social scrutiny), PTSD (trauma-related)'
        ],
        firstLine: [
            'Exposure therapy (in vivo or virtual reality): graded, systematic exposure with response prevention',
            'Single-session treatment for specific phobias (e.g., spiders, heights) - intensive prolonged exposure can be curative',
            'Psychoeducation about anxiety habituation and safety of exposure'
        ],
        secondLine: [
            'Beta-blockers for situational use (e.g., propranolol 10-40mg 30-60 min before flying, dental procedures)',
            'Benzodiazepines (short-term only, as-needed): lorazepam 0.5-1mg, diazepam 2-5mg - risk of avoidance reinforcement, dependence',
            'SSRIs if multiple phobias or comorbid generalised anxiety'
        ],
        investigations: [
            'Clinical diagnosis; no investigations needed',
            'Screen for other anxiety disorders, depression, substance use (self-medication)',
            'Blood-injection-injury phobia: assess for vasovagal syncope, teach applied tension technique'
        ],
        crisis: [
            'Rarely crisis; severe avoidance may impair function (e.g., cannot work due to elevator phobia, cannot access healthcare due to needle phobia)',
            'Medical procedures in phobic patients: advance planning, distraction, topical anaesthetics (needle phobia), gradual desensitisation if time permits'
        ],
        monitoring: [
            'Subjective Units of Distress (SUDS) and avoidance behaviour tracking',
            'Most improve significantly with brief CBT/exposure therapy (5-10 sessions)',
            'Long-term follow-up usually not needed once phobia resolved; booster sessions if relapse'
        ]
    },
    {
        id: 'antisocial-pd',
        title: 'Antisocial personality disorder',
        icon: '⚠️',
        tags: ['Personality', 'Forensic'],
        summary: 'Pervasive disregard for and violation of rights of others since age 15; deceitfulness, impulsivity, aggression, lack of remorse.',
        distinguishing: [
            'DSM-5 criteria: ≥3 of: failure to conform to laws, deceitfulness, impulsivity, irritability/aggression, reckless disregard for safety, irresponsibility, lack of remorse',
            'Onset by age 15 (conduct disorder features); person now ≥18 years old',
            'Differentiate from substance use (symptoms predate and independent of substance use), narcissistic PD (grandiosity vs law-breaking), borderline PD (fear of abandonment vs exploitation)'
        ],
        firstLine: [
            'No evidence-based pharmacotherapy for core personality features',
            'Psychosocial interventions: cognitive skills programmes, anger management, reasoning and rehabilitation',
            'Addressing comorbidities: ADHD (stimulants), substance use (motivational interviewing, MAT), mood instability (mood stabilisers)'
        ],
        secondLine: [
            'Mood stabilisers (carbamazepine 400-800mg, valproate 500-1500mg) or atypical antipsychotics (quetiapine 200-400mg) for impulsivity/aggression in specialist care',
            'SSRIs for comorbid depression/anxiety (common)',
            'Multisystemic therapy or therapeutic communities in forensic settings'
        ],
        investigations: [
            'Detailed developmental history (conduct disorder before age 15), forensic history, collateral from multiple sources',
            'Screen for ADHD (60% comorbidity), substance use, PTSD, head injury',
            'Risk assessment tools: HCR-20, PCL-R (psychopathy checklist) in forensic settings'
        ],
        crisis: [
            'Violence risk - safety planning, involve forensic services, consider probation/criminal justice liaison',
            'Self-harm/suicide (higher than general population) - address impulsivity and comorbid depression',
            'Detention under Mental Health Act only if comorbid mental illness; personality disorder alone insufficient in most jurisdictions'
        ],
        monitoring: [
            'Long-term engagement difficult (poor treatment adherence, manipulation, early dropout)',
            'Focus on harm reduction, addressing modifiable risk factors (substance use, accommodation, relationships)',
            'Coordinate with probation, substance use services, housing; realistic goals and boundaries'
        ]
    },
    {
        id: 'narcissistic-pd',
        title: 'Narcissistic personality disorder',
        icon: '👑',
        tags: ['Personality'],
        summary: 'Grandiosity, need for admiration, lack of empathy; sense of entitlement and exploitative relationships.',
        distinguishing: [
            'DSM-5 criteria: ≥5 of: grandiose self-importance, preoccupation with fantasies of success/power/beauty, belief in being special, need for excessive admiration, sense of entitlement, exploitative, lacks empathy, envious, arrogant',
            'Vulnerable narcissism: hypersensitive to criticism, fragile self-esteem, socially withdrawn despite grandiose fantasies',
            'Differentiate from bipolar mania (episodic vs pervasive), antisocial PD (law-breaking vs entitlement), histrionic PD (attention-seeking vs admiration-seeking)'
        ],
        firstLine: [
            'Psychotherapy: psychodynamic (explore fragile self-esteem, childhood origins) or schema therapy (challenge maladaptive schemas)',
            'Transference-focused therapy or mentalization-based therapy',
            'Group therapy often unsuccessful (dominate group, dismissive of others); individual therapy preferred'
        ],
        secondLine: [
            'No specific pharmacotherapy for narcissistic traits',
            'SSRIs/SNRIs for comorbid depression (common when faced with failure/ageing), anxiety',
            'Mood stabilisers or antipsychotics if severe affective instability, though limited evidence'
        ],
        investigations: [
            'Clinical assessment; no investigations unless ruling out medical causes of personality change',
            'Collateral history often reveals significant discrepancies (patient overestimates achievements, underestimates impact on others)',
            'Screen for comorbid depression (especially following narcissistic injury), substance use, eating disorders'
        ],
        crisis: [
            'Narcissistic injury (failure, criticism, ageing, loss of status) can precipitate severe depression or suicidal crisis',
            'Rage reactions if confronted or challenged - may be aggressive toward perceived source of injury',
            'Poor insight and externalization of blame makes crisis intervention difficult; focus on immediate safety and damage limitation'
        ],
        monitoring: [
            'Engagement challenging (rarely present voluntarily; often coerced by partner, employer, legal system)',
            'Dropout common when not receiving expected admiration/special treatment from therapist',
            'Realistic goals: modest improvements in empathy, less exploitative behaviour; grandiosity often persists'
        ]
    }
];
