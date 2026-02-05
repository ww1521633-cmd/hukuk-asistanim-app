// Risk Analysis Calculation Engine

/**
 * Risk Analysis Engine
 * Calculates risk scores based on user answers and question weights
 */
export class RiskAnalysisEngine {
  constructor(scenario) {
    this.scenario = scenario;
  }

  /**
   * Calculate risk score based on user answers
   * @param {Object} answers - User answers { questionId: optionId(s) }
   * @returns {Object} Risk result with score, level, and details
   */
  calculateRisk(answers) {
    const baseScore = this.scenario.scoringConfig.baseScore;
    let adjustments = [];
    let totalAdjustment = 0;

    // Process each question
    this.scenario.questions.forEach(question => {
      const userAnswer = answers[question.id];
      
      if (!userAnswer) {
        // No answer provided for this question
        return;
      }

      // Handle single choice
      if (question.type === 'single') {
        const selectedOption = question.options.find(opt => opt.id === userAnswer);
        
        if (selectedOption) {
          const weightedDelta = selectedOption.riskDelta * question.weight;
          totalAdjustment += weightedDelta;

          adjustments.push({
            questionId: question.id,
            questionText: question.question,
            category: question.category,
            selectedOption: selectedOption.label,
            delta: selectedOption.riskDelta,
            weight: question.weight,
            finalImpact: weightedDelta,
            isCritical: question.isCritical,
            explanation: selectedOption.explanation,
            tags: selectedOption.tags || []
          });
        }
      }
      // Handle multiple choice
      else if (question.type === 'multiple') {
        const selectedOptionIds = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
        
        selectedOptionIds.forEach(optionId => {
          const selectedOption = question.options.find(opt => opt.id === optionId);
          
          if (selectedOption) {
            const weightedDelta = selectedOption.riskDelta * question.weight;
            totalAdjustment += weightedDelta;

            adjustments.push({
              questionId: question.id,
              questionText: question.question,
              category: question.category,
              selectedOption: selectedOption.label,
              delta: selectedOption.riskDelta,
              weight: question.weight,
              finalImpact: weightedDelta,
              isCritical: question.isCritical,
              explanation: selectedOption.explanation,
              tags: selectedOption.tags || []
            });
          }
        });
      }
    });

    // Calculate final score (clamped between 0-100)
    const rawScore = baseScore + totalAdjustment;
    const finalScore = Math.max(0, Math.min(100, Math.round(rawScore)));

    // Determine risk level
    const riskLevel = this.determineRiskLevel(finalScore);

    // Get recommendation
    const recommendation = this.scenario.recommendations[riskLevel.toLowerCase()];

    // Identify critical factors (high impact items)
    const criticalFactors = adjustments
      .filter(adj => (adj.isCritical && Math.abs(adj.finalImpact) > 10) || Math.abs(adj.finalImpact) > 20)
      .sort((a, b) => Math.abs(b.finalImpact) - Math.abs(a.finalImpact))
      .slice(0, 3);

    return {
      riskScore: finalScore,
      riskLevel: riskLevel,
      riskPercentage: this.getGaugePercentage(finalScore),
      gaugeColor: this.getGaugeColor(finalScore),
      calculationDetails: {
        baseScore: baseScore,
        totalAdjustment: Math.round(totalAdjustment * 10) / 10,
        adjustments: adjustments,
        finalScore: finalScore
      },
      recommendation: recommendation,
      criticalFactors: criticalFactors,
      advice: this.generateAdvice(finalScore, riskLevel, criticalFactors, adjustments)
    };
  }

  /**
   * Determine risk level based on score and thresholds
   * @param {number} score - Final risk score (0-100)
   * @returns {string} Risk level: 'low', 'medium', 'high', 'critical'
   */
  determineRiskLevel(score) {
    const thresholds = this.scenario.scoringConfig.thresholds;

    if (score >= thresholds.critical[0] && score <= thresholds.critical[1]) {
      return 'critical';
    } else if (score >= thresholds.high[0] && score < thresholds.high[1]) {
      return 'high';
    } else if (score >= thresholds.medium[0] && score < thresholds.medium[1]) {
      return 'medium';
    } else {
      return 'low';
    }
  }

  /**
   * Generate AI-style advice text
   * @param {number} score - Risk score
   * @param {string} level - Risk level
   * @param {Array} criticalFactors - Top risk factors
   * @param {Array} allAdjustments - All adjustments
   * @returns {string} Personalized advice
   */
  generateAdvice(score, level, criticalFactors, allAdjustments) {
    let advice = '';

    // Opening statement based on risk level
    if (level === 'low') {
      advice += `Risk skorunuz ${score}/100 ile **Düşük** seviyede. Hukuki pozisyonunuz oldukça güçlü görünüyor. `;
    } else if (level === 'medium') {
      advice += `Risk skorunuz ${score}/100 ile **Orta** seviyede. Bazı riskler mevcut ancak yönetilebilir durumda. `;
    } else if (level === 'high') {
      advice += `Risk skorunuz ${score}/100 ile **Yüksek** seviyede. Ciddi hukuki riskler tespit edildi. `;
    } else {
      advice += `Risk skorunuz ${score}/100 ile **Kritik** seviyede. ⚠️ Acil eylem gerekiyor. `;
    }

    // Mention top risk factors
    if (criticalFactors.length > 0) {
      const topFactors = criticalFactors.slice(0, 2);
      advice += `\\n\\n**Öne Çıkan Risk Faktörleri:**\\n`;
      
      topFactors.forEach((factor, index) => {
        const impact = factor.finalImpact > 0 ? 'artırıyor' : 'azaltıyor';
        const emoji = factor.finalImpact > 0 ? '⚠️' : '✅';
        advice += `${index + 1}. ${emoji} **${factor.category}**: ${factor.selectedOption} - Bu durum riskinizi ${impact}. ${factor.explanation}\\n`;
      });
    }

    // Positive factors
    const positiveFactors = allAdjustments.filter(adj => adj.finalImpact < -10);
    if (positiveFactors.length > 0 && level !== 'critical') {
      advice += `\\n**Güçlü Yönleriniz:** `;
      const topPositive = positiveFactors.slice(0, 2).map(f => f.category).join(', ');
      advice += `${topPositive} konularında iyi bir pozisyondasınız.`;
    }

    // Immediate recommendation
    advice += `\\n\\n**Hemen Yapmanız Gerekenler:**\\n`;
    if (level === 'critical') {
      advice += `• 🚨 Bugün bir avukatla görüşün\\n• 📄 Tüm belgeleri toplayın\\n• ⏰ Süre sınırlarına dikkat edin`;
    } else if (level === 'high') {
      advice += `• 👨‍⚖️ Bir hukuk danışmanına başvurun\\n• 📝 Eksik delilleri tamamlayın\\n• 📨 Yazılı bildirimleri hazırlayın`;
    } else if (level === 'medium') {
      advice += `• 📋 Delilleri düzenli tutun\\n• 🔍 Eksik belgeleri tamamlayın\\n• 💬 Karşı tarafla iletişimi yazılı yapın`;
    } else {
      advice += `• ✅ Mevcut belgeleri koruyun\\n• 📊 Sözleşme şartlarına uyun\\n• 🤝 İyi iletişimi sürdürün`;
    }

    return advice;
  }

  /**
   * Get gauge percentage for visual display
   * @param {number} score - Risk score (0-100)
   * @returns {number} Percentage value
   */
  getGaugePercentage(score) {
    return Math.max(0, Math.min(100, score));
  }

  /**
   * Get gauge color based on risk score
   * @param {number} score - Risk score (0-100)
   * @returns {string} Hex color code
   */
  getGaugeColor(score) {
    if (score < 40) {
      return '#10b981'; // Green - Low risk
    } else if (score < 60) {
      return '#f59e0b'; // Orange - Medium risk
    } else if (score < 80) {
      return '#ef4444'; // Red - High risk
    } else {
      return '#9333ea'; // Purple - Critical risk
    }
  }

  /**
   * Get risk level label in Turkish
   * @param {string} level - Risk level (low/medium/high/critical)
   * @returns {string} Turkish label
   */
  getRiskLevelLabel(level) {
    const labels = {
      'low': 'Düşük',
      'medium': 'Orta',
      'high': 'Yüksek',
      'critical': 'Kritik'
    };
    return labels[level] || 'Bilinmiyor';
  }
}

/**
 * Helper function: Calculate risk for a scenario
 * @param {Object} scenario - Risk scenario object
 * @param {Object} answers - User answers
 * @returns {Object} Risk analysis result
 */
export function calculateRisk(scenario, answers) {
  const engine = new RiskAnalysisEngine(scenario);
  return engine.calculateRisk(answers);
}

/**
 * Helper function: Validate if all required questions are answered
 * @param {Object} scenario - Risk scenario object
 * @param {Object} answers - User answers
 * @returns {Object} Validation result { isValid, missingQuestions }
 */
export function validateAnswers(scenario, answers) {
  const missingQuestions = [];

  scenario.questions.forEach(question => {
    if (!answers[question.id]) {
      missingQuestions.push({
        id: question.id,
        question: question.question,
        category: question.category
      });
    }
  });

  return {
    isValid: missingQuestions.length === 0,
    missingQuestions: missingQuestions
  };
}

/**
 * Helper function: Get progress percentage
 * @param {Object} scenario - Risk scenario object
 * @param {Object} answers - User answers
 * @returns {number} Progress percentage (0-100)
 */
export function getProgress(scenario, answers) {
  const totalQuestions = scenario.questions.length;
  const answeredQuestions = Object.keys(answers).length;
  return Math.round((answeredQuestions / totalQuestions) * 100);
}
