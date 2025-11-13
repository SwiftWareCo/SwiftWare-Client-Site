'use client';
import Icon from '@/components/ui/Icon';
import { ArrowRight } from 'lucide-react';

export const UnifiedSystemConnector = () => {
  return (
    <div className='bg-gray-50 dark:bg-gray-950 py-16 sm:py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='lg:text-center'>
          <h2 className='text-base font-semibold leading-7 text-blue-600 dark:text-blue-400'>
            The SwiftWare Difference
          </h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'>
            Marketing Gets the Lead. Our System Closes the Deal.
          </p>
        </div>
        <div className='mt-16 flex flex-col items-center gap-12 lg:flex-row lg:gap-16'>
          <div className='flex-1 text-lg text-gray-600 dark:text-gray-300 lg:max-w-2xl'>
            <p>
              Getting a lead is only half the battle. Our competitors send you a
              name and number.{' '}
              <strong className='text-gray-900 dark:text-white'>
                We build a system.
              </strong>
            </p>
            <p className='mt-4'>
              Our marketing campaigns connect directly to your Custom Software
              (website) and trigger your AI Automation to follow up with that
              lead in seconds—before our competitor even knows they have a new
              email.
            </p>
          </div>
          <div className='flex flex-1 w-full items-center justify-center'>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900'>
              <div className='flex flex-col items-center text-center p-4 border-2 border-blue-500 rounded-lg bg-blue-50 dark:bg-blue-900/20'>
                <Icon
                  name='Megaphone'
                  className='h-10 w-10 text-blue-600 dark:text-blue-400'
                />
                <span className='mt-2 font-bold text-gray-900 dark:text-white'>
                  Digital Marketing
                </span>
              </div>
              <ArrowRight className='h-8 w-8 text-gray-400 dark:text-gray-500 hidden sm:block' />
              <div className='flex flex-col items-center text-center p-4'>
                <Icon name='Bot' className='h-10 w-10 text-gray-500' />
                <span className='mt-2 font-semibold text-gray-700 dark:text-gray-300'>
                  AI Automation
                </span>
              </div>
              <ArrowRight className='h-8 w-8 text-gray-400 dark:text-gray-500 hidden sm:block' />
              <div className='flex flex-col items-center text-center p-4'>
                <Icon name='Code' className='h-10 w-10 text-gray-500' />
                <span className='mt-2 font-semibold text-gray-700 dark:text-gray-300'>
                  Custom Software
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
