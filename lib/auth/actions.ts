'use server'

import { prisma } from '@/lib/prisma'
import { registerSchema, loginSchema } from '@/lib/validations/auth'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function registerAction(prevState: any, formData: FormData) {
  console.log('📝 registerAction started');
  
  try {
    // Log all form data
    console.log('FormData entries:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    console.log('Extracted values:', { email, password: '***', name });

    // Validate
    const validatedFields = registerSchema.parse({ 
      email, 
      password, 
      name: name || undefined 
    });
    console.log('Validation passed:', validatedFields);

    // Check if user exists
    console.log('Checking for existing user with email:', validatedFields.email);
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedFields.email.toLowerCase() } // Case insensitive
    });

    if (existingUser) {
      console.log('❌ User already exists');
      return { 
        success: false,
        error: 'User already exists',
        fieldErrors: null,
        message: null 
      };
    }

    // Hash password
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(validatedFields.password, 10);
    console.log('Password hashed');

    // Create user
    console.log('Creating user...');
    const user = await prisma.user.create({
      data: {
        email: validatedFields.email.toLowerCase(), // Store lowercase
        password: hashedPassword,
        name: validatedFields.name || null,
      },
    });

    console.log('✅ User created successfully:', {
      id: user.id,
      email: user.email,
      name: user.name
    });

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set('session', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    console.log('Session cookie set');

    return { 
      success: true,
      message: 'Account created successfully!',
      error: null,
      fieldErrors: null 
    };

  } catch (error) {
    console.error('❌ registerAction error:', error);
    
    if (error instanceof z.ZodError) {
      console.log('Validation errors:', error.errors);
      const fieldErrors: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const path = err.path[0] as string;
        if (!fieldErrors[path]) {
          fieldErrors[path] = [];
        }
        fieldErrors[path].push(err.message);
      });
      
      return { 
        success: false,
        error: 'Please check your input',
        fieldErrors,
        message: null 
      };
    }

    // Handle Prisma errors
    if (error.code === 'P2002') {
      console.log('❌ Unique constraint violation (email already exists)');
      return { 
        success: false,
        error: 'Email already exists',
        fieldErrors: null,
        message: null 
      };
    }

    return { 
      success: false,
      error: 'Something went wrong. Please try again.',
      fieldErrors: null,
      message: null 
    };
  }
}

export async function LoginAction(prevState: any, formData: FormData) {
  console.log('🔐 LoginAction started');
  
  try {
    // Log what we received
    console.log('FormData entries:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log('Extracted:', { email, password: '***' });

    // Validate
    const validatedFields = loginSchema.parse({ email, password });
    console.log('Validation passed:', validatedFields);

    // Find user
    console.log('Looking up user with email:', validatedFields.email);
    const user = await prisma.user.findUnique({
      where: { email: validatedFields.email }
    });

    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('❌ No user found with this email');
      return { 
        success: false,
        error: 'Invalid credentials',
        fieldErrors: null,
        message: null 
      };
    }

    // Verify password
    console.log('Comparing passwords...');
    const passwordValid = await bcrypt.compare(validatedFields.password, user.password);
    console.log('Password valid:', passwordValid);

    if (!passwordValid) {
      console.log('❌ Password incorrect');
      return { 
        success: false,
        error: 'Invalid credentials',
        fieldErrors: null,
        message: null 
      };
    }

    // Set session cookie
    console.log('✅ Login successful, setting cookie for user:', user.id);
    const cookieStore = await cookies();
    cookieStore.set('session', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    console.log('Cookie set, returning success');
    return { 
      success: true,
      message: 'Login successful!',
      error: null,
      fieldErrors: null 
    };

  } catch (error) {
    console.error('❌ LoginAction error:', error);
    
    if (error.name === 'ZodError') {
      console.log('Validation error:', error.errors);
      return { 
        success: false,
        error: 'Invalid form data',
        fieldErrors: null,
        message: null 
      };
    }

    return { 
      success: false,
      error: 'Something went wrong',
      fieldErrors: null,
      message: null 
    };
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('userId')
  redirect('/login')
}