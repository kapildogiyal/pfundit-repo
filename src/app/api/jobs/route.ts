import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const jobsFilePath = path.join(process.cwd(), 'src/data/jobs.json');

export async function GET() {
  try {
    const data = await fs.readFile(jobsFilePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading jobs:', error);
    return NextResponse.json({ error: 'Failed to read jobs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await fs.readFile(jobsFilePath, 'utf8');
    const jobs = JSON.parse(data);
    
    const newId = (Math.max(0, ...jobs.map((j: any) => parseInt(j.id) || 0)) + 1).toString().padStart(2, '0');
    
    const newJob = {
      ...body,
      id: newId,
    };
    
    jobs.push(newJob);
    await fs.writeFile(jobsFilePath, JSON.stringify(jobs, null, 2));
    
    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}
