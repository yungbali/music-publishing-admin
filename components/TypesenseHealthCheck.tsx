"use client";

import { useEffect, useState } from "react";
import client from "../lib/typesenseClient";

interface TypesenseHealthCheckProps {
  onReady?: (ready: boolean) => void;
  showError?: boolean;
}

export default function TypesenseHealthCheck({ 
  onReady, 
  showError = false 
}: TypesenseHealthCheckProps) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function checkTypesense() {
      try {
        const collections = await client.collections().retrieve();
        const collectionNames = collections.map((col: any) => col.name);
        const requiredCollections = ['songs', 'writers', 'clients'];
        const hasAllCollections = requiredCollections.every(name => 
          collectionNames.includes(name)
        );

        if (mounted) {
          if (hasAllCollections) {
            setIsReady(true);
            setError(null);
            onReady?.(true);
          } else {
            setIsReady(false);
            const missing = requiredCollections.filter(name => 
              !collectionNames.includes(name)
            );
            setError(`Missing collections: ${missing.join(', ')}`);
            onReady?.(false);
          }
        }
      } catch (err) {
        if (mounted) {
          setIsReady(false);
          setError(`Typesense connection error: ${err instanceof Error ? err.message : 'Unknown error'}`);
          onReady?.(false);
        }
      }
    }

    checkTypesense();

    return () => {
      mounted = false;
    };
  }, [onReady]);

  if (!showError) {
    return null;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Typesense Connection Issue
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
              <p className="mt-1">
                Please run: <code className="bg-red-100 px-1 rounded">npm run init-typesense</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="animate-spin h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Checking Typesense Connection...
            </h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">
            Typesense Connected
          </h3>
        </div>
      </div>
    </div>
  );
}
