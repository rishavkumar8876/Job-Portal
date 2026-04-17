export const calculateMatchScore = (candidate, job) => {
  if (!candidate.length || !job.length) return 0;

  // ✅ normalize properly
  const normalize = (skill) =>
    skill.toLowerCase().replace(/\.js/g, "").trim();

  const c = candidate.map(normalize);
  const j = job.map(normalize);

  let match = 0;

  j.forEach(skill => {
  if (c.some(cSkill => cSkill.includes(skill) || skill.includes(cSkill))) {
    match++;
  }
});

  return Math.round((match / j.length) * 100);
};