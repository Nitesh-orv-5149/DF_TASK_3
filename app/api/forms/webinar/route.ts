import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import path from 'path'
import { promises as fs } from 'fs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, number, state, exam, rank } = body;

    const credentials = {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // This is crucial
      };
      

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
    const range = 'Webinar!A2';

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[name, email, number, state, exam, rank, new Date().toLocaleString()]],
      },
    });

    return NextResponse.json({ message: 'Data saved to Google Sheet' });
    console.log('Data saved to Google Sheet:', body);
  } catch (error) {
    console.error('Error saving to sheet:', error);
    return NextResponse.json({ error: 'Failed to write to sheet' }, { status: 500 });
  }
}
