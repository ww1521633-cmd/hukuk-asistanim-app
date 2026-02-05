// Risk Engine Test
// Run this with: node tests/risk-engine.test.js

const { RiskAnalysisEngine, calculateRisk, validateAnswers, getProgress } = require('../lib/risk-engine');
const { RISK_SCENARIOS } = require('../data/mock-risk-scenarios');

console.log('🧪 RISK ENGINE TEST - Starting...\n');

// Get first scenario (Kira Anlaşmazlığı)
const scenario = RISK_SCENARIOS[0];
console.log(`📋 Testing Scenario: ${scenario.name}\n`);

// Test Case 1: LOW RISK SCENARIO
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('TEST 1: LOW RISK SCENARIO');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const lowRiskAnswers = {
  'q1': 'a1', // Noterde onaylı sözleşme (-15)
  'q2': 'b1', // Tüm ödemeler dekontla (-20)
  'q3': 'c1', // Resmi bildirim yok (0)
  'q4': 'd1', // TÜFE artışı yazılı (-10)
  'q5': ['e1'], // Her şey normal (0)
  'q6': 'f1'  // Avukat takip ediyor (-12)
};

const lowRiskResult = calculateRisk(scenario, lowRiskAnswers);

console.log(`✅ Risk Score: ${lowRiskResult.riskScore}/100`);
console.log(`📊 Risk Level: ${lowRiskResult.riskLevel.toUpperCase()}`);
console.log(`🎨 Gauge Color: ${lowRiskResult.gaugeColor}`);
console.log(`\n📝 AI Advice:\n${lowRiskResult.advice}\n`);
console.log(`🔍 Critical Factors: ${lowRiskResult.criticalFactors.length} items`);
lowRiskResult.criticalFactors.forEach((factor, i) => {
  console.log(`   ${i+1}. ${factor.category}: ${factor.selectedOption} (Impact: ${factor.finalImpact.toFixed(1)})`);
});
console.log(`\n✅ Recommendation: ${lowRiskResult.recommendation.title}\n`);

// Test Case 2: HIGH RISK SCENARIO
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('TEST 2: HIGH RISK SCENARIO');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const highRiskAnswers = {
  'q1': 'a4', // Hiçbir belge yok (+35)
  'q2': 'b4', // 3 aydan fazla gecikme (+30)
  'q3': 'c4', // Mahkeme tebligatı (+35)
  'q4': 'd2', // Belirsiz şartlar (+10)
  'q5': ['e2', 'e4'], // Su kaçağı (+8) + Yapısal hasar (+15)
  'q6': 'f3'  // Avukat yok (+10)
};

const highRiskResult = calculateRisk(scenario, highRiskAnswers);

console.log(`⚠️ Risk Score: ${highRiskResult.riskScore}/100`);
console.log(`📊 Risk Level: ${highRiskResult.riskLevel.toUpperCase()}`);
console.log(`🎨 Gauge Color: ${highRiskResult.gaugeColor}`);
console.log(`\n📝 AI Advice:\n${highRiskResult.advice}\n`);
console.log(`🔍 Critical Factors: ${highRiskResult.criticalFactors.length} items`);
highRiskResult.criticalFactors.forEach((factor, i) => {
  console.log(`   ${i+1}. ${factor.category}: ${factor.selectedOption} (Impact: ${factor.finalImpact.toFixed(1)})`);
});
console.log(`\n⚠️ Recommendation: ${highRiskResult.recommendation.title}\n`);

// Test Case 3: MEDIUM RISK SCENARIO
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('TEST 3: MEDIUM RISK SCENARIO');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const mediumRiskAnswers = {
  'q1': 'a2', // İmzalı sözleşme (-5)
  'q2': 'b3', // 1-2 ay gecikme (+15)
  'q3': 'c2', // WhatsApp uyarı (+10)
  'q4': 'd3', // Artış maddesi yok (+5)
  'q5': ['e1'], // Normal durum (0)
  'q6': 'f2'  // Bir kez danışma (-5)
};

const mediumRiskResult = calculateRisk(scenario, mediumRiskAnswers);

console.log(`📊 Risk Score: ${mediumRiskResult.riskScore}/100`);
console.log(`📊 Risk Level: ${mediumRiskResult.riskLevel.toUpperCase()}`);
console.log(`🎨 Gauge Color: ${mediumRiskResult.gaugeColor}`);
console.log(`\n📝 AI Advice:\n${mediumRiskResult.advice}\n`);

// Test Validation
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('TEST 4: VALIDATION & PROGRESS');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const partialAnswers = {
  'q1': 'a1',
  'q2': 'b1',
  'q3': 'c1'
};

const validation = validateAnswers(scenario, partialAnswers);
console.log(`✅ Is Valid: ${validation.isValid}`);
console.log(`📋 Missing Questions: ${validation.missingQuestions.length}`);
validation.missingQuestions.forEach(q => {
  console.log(`   - ${q.category}: ${q.question}`);
});

const progress = getProgress(scenario, partialAnswers);
console.log(`\n📊 Progress: ${progress}%\n`);

// Test Scenario 2 (İşçilik Alacağı)
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('TEST 5: SCENARIO 2 - İŞÇİLİK ALACAĞI');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const scenario2 = RISK_SCENARIOS[1];
const laborAnswers = {
  'q1': 'a1', // Yazılı sözleşme var (-18)
  'q2': 'b1', // Haklı sebep olmadan fesih (-15)
  'q3': ['c3', 'c4'], // Kıdem + İhbar (0 + 0)
  'q4': ['d1', 'd2', 'd4'], // Bordro + Banka + SGK (-10 -8 -12)
  'q5': 'e1', // Şirket iyi durumda (-10)
  'q6': ['f4', 'f6'] // Dava açtım + Avukat var (-15 -12)
};

const laborResult = calculateRisk(scenario2, laborAnswers);

console.log(`✅ Risk Score: ${laborResult.riskScore}/100`);
console.log(`📊 Risk Level: ${laborResult.riskLevel.toUpperCase()}`);
console.log(`🎨 Gauge Color: ${laborResult.gaugeColor}\n`);
console.log(`📝 Recommendation: ${laborResult.recommendation.title}\n`);

// Summary
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🎯 TEST SUMMARY');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log(`✅ Test 1 (Low Risk): ${lowRiskResult.riskScore} - ${lowRiskResult.riskLevel}`);
console.log(`⚠️ Test 2 (High Risk): ${highRiskResult.riskScore} - ${highRiskResult.riskLevel}`);
console.log(`📊 Test 3 (Medium Risk): ${mediumRiskResult.riskScore} - ${mediumRiskResult.riskLevel}`);
console.log(`✅ Test 4 (Validation): ${validation.isValid ? 'PASSED' : 'FAILED (Expected)'}`);
console.log(`✅ Test 5 (Scenario 2): ${laborResult.riskScore} - ${laborResult.riskLevel}\n`);

console.log('🎉 ALL TESTS COMPLETED!\n');

// Export for use in other tests
module.exports = {
  testLowRisk: lowRiskResult,
  testHighRisk: highRiskResult,
  testMediumRisk: mediumRiskResult
};
