import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const jobsFilePath = path.join(process.cwd(), 'src/data/jobs.json');

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const body = await request.json();
    const data = await fs.readFile(jobsFilePath, 'utf8');
    const jobs = JSON.parse(data);
    
    const index = jobs.findIndex((j: any) => j.id === params.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    
    jobs[index] = { ...jobs[index], ...body, id: params.id };
    await fs.writeFile(jobsFilePath, JSON.stringify(jobs, null, 2));
    
    return NextResponse.json(jobs[index]);
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const data = await fs.readFile(jobsFilePath, 'utf8');
    const jobs = JSON.parse(data);
    
    const filteredJobs = jobs.filter((j: any) => j.id !== params.id);
    if (jobs.length === filteredJobs.length) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    
    await fs.writeFile(jobsFilePath, JSON.stringify(filteredJobs, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
