import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Scan, Globe, AlertTriangle, CheckCircle, ShieldCheck, 
  Code2, Download, Copy, Check, ArrowRight, ExternalLink, RefreshCw, Zap
} from 'lucide-react';
import { toast } from 'react-toastify';
import { scanWebsite } from '../services/scannerService';
import ScoreCard from '../components/ScoreCard';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';

const AIScanner = () => {
  const [url, setUrl] = useState('https://www.cuchd.in');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [results, setResults] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const scanSteps = [
    'Connecting to website DOM...',
    'Evaluating WCAG 2.1 AA Color Contrast & Typography...',
    'Auditing ARIA roles, ALT attributes & Keyboard Focus...',
    'Generating AI-Powered Code Remediation Fixes...'
  ];

  const handleStartScan = async (e) => {
    if (e) e.preventDefault();
    if (!url.trim()) {
      toast.error('Please enter a valid website URL.');
      return;
    }

    setIsScanning(true);
    setResults(null);
    setScanStep(0);

    const stepInterval = setInterval(() => {
      setScanStep((prev) => (prev < scanSteps.length - 1 ? prev + 1 : prev));
    }, 500);

    try {
      const data = await scanWebsite(url);
      clearInterval(stepInterval);
      setResults(data);
      toast.success('AI Audit completed successfully!');
    } catch (error) {
      clearInterval(stepInterval);
      toast.error('Failed to analyze the specified URL.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleCopyCode = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('AI Code Fix copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredIssues = results?.issues.filter((issue) => {
    if (activeFilter === 'ALL') return true;
    return issue.impact === activeFilter;
  }) || [];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-textMain flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Sparkles size={22} />
            </div>
            AI Web Accessibility Scanner
          </h2>
          <p className="text-textLight mt-1.5 font-medium">
            Scan university web applications for WCAG 2.1 AA compliance & receive instant AI code fixes.
          </p>
        </div>

        {results && (
          <Button
            icon={Download}
            onClick={() => toast.success('Executive AI Audit Report downloaded!')}
            className="shadow-md"
          >
            Export Audit Report
          </Button>
        )}
      </div>

      {/* URL Scanner Search Card */}
      <Card className="p-6 bg-gradient-to-r from-white via-emerald-50/20 to-primary/5 border border-primary/20 shadow-xl">
        <form onSubmit={handleStartScan} className="space-y-4">
          <label className="block text-sm font-bold text-textMain uppercase tracking-wider">
            Target Web Application URL
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Globe size={20} />
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.example.edu"
                disabled={isScanning}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-textMain font-medium shadow-sm transition-all"
              />
            </div>

            <Button
              type="submit"
              isLoading={isScanning}
              icon={Zap}
              className="py-3.5 px-8 text-base shadow-lg shadow-primary/20 flex-shrink-0"
            >
              {isScanning ? 'Auditing Page...' : 'Run AI Audit'}
            </Button>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2 flex-wrap pt-2">
            <span className="text-xs font-semibold text-textLight">Quick Presets:</span>
            {['https://www.cuchd.in', 'https://lms.cuchd.in', 'https://uims.cuchd.in'].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setUrl(preset);
                }}
                disabled={isScanning}
                className="text-xs bg-white border border-gray-200 hover:border-primary/50 text-gray-700 px-3 py-1.5 rounded-lg transition-all shadow-xs font-mono hover:text-primary"
              >
                {preset}
              </button>
            ))}
          </div>
        </form>
      </Card>

      {/* Scanning Animation */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-8 glass-panel rounded-2xl border border-primary/30 flex flex-col items-center justify-center text-center space-y-5"
          >
            <div className="relative flex items-center justify-center w-20 h-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-4 border-dashed border-primary/30"
              />
              <motion.div
                animate={{ scale: [0.8, 1.15, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30"
              >
                <Scan size={24} />
              </motion.div>
            </div>

            <div>
              <p className="text-lg font-extrabold text-textMain font-heading">
                AI Accessibility Scanner Active
              </p>
              <p className="text-sm font-semibold text-primary mt-1 animate-pulse">
                {scanSteps[scanStep]}
              </p>
            </div>

            <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audit Results Dashboard */}
      {results && !isScanning && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Overview Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScoreCard
              title="WCAG 2.1 Score"
              value={`${results.score}/100`}
              colorClass={results.score >= 80 ? 'text-success bg-success-50' : 'text-primary bg-primary-50'}
              icon={<ShieldCheck size={24} />}
            />
            <ScoreCard
              title="Critical Violations"
              value={results.summary.critical}
              colorClass="text-danger bg-danger-50"
              icon={<AlertTriangle size={24} />}
            />
            <ScoreCard
              title="High Impact Issues"
              value={results.summary.high}
              colorClass="text-amber-600 bg-amber-50"
              icon={<AlertTriangle size={24} />}
            />
            <ScoreCard
              title="Passed Rules"
              value={`${results.summary.passed}/${results.summary.totalRulesChecked}`}
              colorClass="text-emerald-600 bg-emerald-50"
              icon={<CheckCircle size={24} />}
            />
          </div>

          {/* Detailed Findings & AI Remediation */}
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-heading font-bold text-textMain flex items-center gap-2">
                  <Code2 className="text-primary" /> AI Remediation Diagnostics
                </h3>
                <p className="text-xs text-textLight font-medium mt-0.5">
                  Showing detected WCAG compliance issues and AI-generated code solutions.
                </p>
              </div>

              {/* Impact Filters */}
              <div className="flex bg-gray-100 p-1 rounded-xl gap-1 text-xs font-bold">
                {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeFilter === filter
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-600 hover:text-textMain'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </CardHeader>

            <CardContent className="space-y-6 pt-4">
              {filteredIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="p-5 rounded-2xl border border-gray-100 bg-white/60 shadow-sm space-y-4 hover:border-primary/30 transition-all"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-xs font-mono font-bold px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md">
                          {issue.id.toUpperCase()}
                        </span>
                        <span
                          className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                            issue.impact === 'CRITICAL'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : issue.impact === 'HIGH'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {issue.impact} IMPACT
                        </span>
                        <span className="text-xs font-semibold text-textLight">
                          Category: <strong>{issue.category}</strong>
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-textMain font-heading mt-1">
                        {issue.rule}
                      </h4>
                    </div>

                    <span className="text-xs font-mono bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg">
                      Selector: {issue.element}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 font-medium">
                    {issue.description}
                  </p>

                  {/* Side-by-Side Code Fix Comparison */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Detected Non-Compliant HTML */}
                    <div className="p-4 bg-red-50/50 border border-red-200/80 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-red-700 uppercase tracking-wider">
                        <span>Detected Issue Snippet</span>
                        <span className="text-[10px] bg-red-100 px-2 py-0.5 rounded">Non-Compliant</span>
                      </div>
                      <pre className="text-xs font-mono text-red-900 bg-white p-3 rounded-lg border border-red-100 overflow-x-auto">
                        <code>{issue.snippet}</code>
                      </pre>
                    </div>

                    {/* AI Remediation Fix */}
                    <div className="p-4 bg-emerald-50/50 border border-emerald-200/80 rounded-xl space-y-2 relative">
                      <div className="flex items-center justify-between text-xs font-bold text-emerald-700 uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          <Sparkles size={14} className="text-emerald-600" /> AI Suggested Code Fix
                        </span>
                        <button
                          onClick={() => handleCopyCode(issue.aiFix, issue.id)}
                          className="flex items-center gap-1 text-[11px] bg-white border border-emerald-200 hover:bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md transition-all font-semibold"
                        >
                          {copiedId === issue.id ? <Check size={13} /> : <Copy size={13} />}
                          {copiedId === issue.id ? 'Copied' : 'Copy Fix'}
                        </button>
                      </div>
                      <pre className="text-xs font-mono text-emerald-950 bg-white p-3 rounded-lg border border-emerald-100 overflow-x-auto">
                        <code>{issue.aiFix}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="bg-primary/5 p-3 rounded-xl text-xs font-medium text-primary flex items-center gap-2">
                    <Zap size={14} className="flex-shrink-0" />
                    <span><strong>AI Guidance:</strong> {issue.remediation}</span>
                  </div>
                </div>
              ))}

              {filteredIssues.length === 0 && (
                <div className="text-center py-12 text-textLight font-medium">
                  No issues found matching the "{activeFilter}" impact filter.
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default AIScanner;
