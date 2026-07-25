import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';
import NotFound from './NotFound';
import SEO from '../components/SEO';
import { supabase } from '../utils/supabaseClient';
import { formatDataNewlines } from '../utils/textHelper';

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<any>(() => 
    portfolioData.projects.find(p => p.id === projectId)
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectFromDb();
  }, [projectId]);

  const fetchProjectFromDb = async () => {
    try {
      const { data: rawDbProject } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .maybeSingle();

      const dbProject = formatDataNewlines(rawDbProject);
      if (dbProject) {
        setProject({
          id: dbProject.id,
          cat: dbProject.cat,
          title: dbProject.title,
          desc: dbProject.description,
          img: dbProject.img_url,
          year: dbProject.year,
          client: dbProject.client,
          duration: dbProject.duration,
          services: Array.isArray(dbProject.services) ? dbProject.services : [],
          challenge: dbProject.detail_challenge,
          solution: dbProject.detail_solution,
          outcome: dbProject.detail_outcome,
          results: Array.isArray(dbProject.results) ? dbProject.results : []
        });
      }
    } catch (err) {
      console.warn('Failed to load project from database, using static fallback.', err);
    } finally {
      setLoading(false);
    }
  };

  if (!project && !loading) {
    return (
      <NotFound
        title="Project Not Found"
        message="The project case study you are looking for does not exist or has been archived."
      />
    );
  }

  if (loading && !project) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple)' }}>
        Loading case study...
      </div>
    );
  }

  return (
    <div className="page">
      <SEO 
        title={`${project.title} - Case Study`} 
        description={project.desc} 
        keywords={`${project.title}, case study, portfolio item, digital product development`} 
      />
      {/* ─── PAGE HERO ─── */}
      <section className="page-hero" style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="page-hero-tag">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
            {project.cat} Case Study
          </div>
          <h1 className="page-hero-title" style={{ marginBottom: 12 }}>
            {project.title}
          </h1>
          <p className="page-hero-desc" style={{ maxWidth: 700 }}>
            {project.desc}
          </p>
        </div>
      </section>

      {/* ─── PROJECT DETAILS BODY ─── */}
      <section className="section" style={{ background: 'var(--white)', paddingTop: 20 }}>
        <div className="container">
          {/* Main Hero Image */}
          <div style={{
            width: '100%',
            height: 'clamp(300px, 45vw, 600px)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            marginBottom: 48,
            boxShadow: 'var(--shadow-md)'
          }}>
            <img 
              src={project.img} 
              alt={project.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          <div className="projectdetail-layout">
            
            {/* Left Content Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--dark)', marginBottom: 14 }}>
                  The Challenge
                </h2>
                <p style={{ fontSize: 16, color: 'var(--gray-400)', lineHeight: 1.8 }}>
                  {project.challenge}
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--dark)', marginBottom: 14 }}>
                  Our Solution
                </h2>
                <p style={{ fontSize: 16, color: 'var(--gray-400)', lineHeight: 1.8 }}>
                  {project.solution}
                </p>
              </div>

              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--dark)', marginBottom: 14 }}>
                  The Outcome
                </h2>
                <p style={{ fontSize: 16, color: 'var(--gray-400)', lineHeight: 1.8 }}>
                  {project.outcome}
                </p>
              </div>

            </div>

            {/* Right Meta Column */}
            <div style={{ 
              background: 'var(--gray-50)', 
              borderRadius: 'var(--radius-lg)', 
              padding: 30, 
              border: '1px solid var(--gray-100)',
              position: 'sticky',
              top: 100,
              display: 'flex',
              flexDirection: 'column',
              gap: 24
            }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-400)', marginBottom: 4 }}>Client</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--dark2)' }}>{project.client}</div>
              </div>

              <div style={{ width: '100%', height: 1, background: 'var(--gray-200)' }} />

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-400)', marginBottom: 4 }}>Timeline</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--dark2)' }}>{project.duration}</div>
              </div>

              <div style={{ width: '100%', height: 1, background: 'var(--gray-200)' }} />

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-400)', marginBottom: 4 }}>Year</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--dark2)' }}>{project.year}</div>
              </div>

              <div style={{ width: '100%', height: 1, background: 'var(--gray-200)' }} />

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-400)', marginBottom: 8 }}>Services Rendered</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {project.services.map((service: string, idx: number) => (
                    <span key={idx} style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--purple)',
                      background: 'var(--purple-faint2)',
                      padding: '4px 10px',
                      borderRadius: 4
                    }}>
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Results Highlights */}
          {project.results && project.results.length > 0 && (
            <div style={{
              background: 'var(--purple-faint)',
              borderRadius: 'var(--radius-lg)',
              padding: 40,
              border: '1px solid var(--purple-faint2)',
              marginTop: 60
            }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--dark2)', marginBottom: 20 }}>
                Key Results Achieved
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
                {project.results.map((result: string, idx: number) => (
                  <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%', background: 'var(--purple)',
                      color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 2
                    }}>
                      ✓
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--dark2)', lineHeight: 1.4 }}>
                      {result}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--gray-100)', marginTop: 80, paddingTop: 30 }}>
            <Link to="/portfolio" className="btn btn-outline">
              ← Back to Portfolio
            </Link>
            <Link to="/consultation" className="btn btn-primary">
              Discuss Your Project →
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
