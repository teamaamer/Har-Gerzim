import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Info, Shield, Lock, Truck, RefreshCw, BadgeCheck, Cookie, Eye } from 'lucide-react';

interface LegalPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const sections = [
    {
      id: 'about',
      title: dict.about.title,
      icon: Info,
      content: [
        {
          heading: '',
          text: dict.about.content
        }
      ]
    },
    {
      id: 'terms',
      title: dict.terms.title,
      icon: Shield,
      content: [
        {
          heading: dict.terms.usageTitle,
          text: `${dict.terms.age} ${dict.terms.ageDeclaration} ${dict.terms.cancellation}`
        },
        {
          heading: dict.terms.pricingTitle,
          text: `${dict.terms.pricing} ${dict.terms.payment}`
        },
        {
          heading: dict.terms.warrantyTitle,
          text: `${dict.terms.images} ${dict.terms.differences} ${dict.terms.warrantyScope}`
        },
        {
          heading: dict.terms.jurisdictionTitle,
          text: `${dict.terms.law} ${dict.terms.jurisdiction}`
        }
      ]
    },
    {
      id: 'privacy',
      title: dict.privacy.title,
      icon: Lock,
      content: [
        {
          heading: dict.privacy.dataCollected,
          text: dict.privacy.dataCollectedContent
        },
        {
          heading: dict.privacy.paymentSecurity,
          text: dict.privacy.paymentSecurityContent
        },
        {
          heading: dict.privacy.purpose,
          text: dict.privacy.purposeContent
        },
        {
          heading: dict.privacy.thirdParties,
          text: dict.privacy.thirdPartiesContent
        },
        {
          heading: dict.privacy.consent,
          text: dict.privacy.consentContent
        }
      ]
    },
    {
      id: 'shipping',
      title: dict.shipping.title,
      icon: Truck,
      content: [
        {
          heading: '',
          text: `${dict.shipping.israelOnly} ${dict.shipping.deliveryTime} ${dict.shipping.businessDays} ${dict.shipping.deliveryNote} ${dict.shipping.delays} ${dict.shipping.pickup} ${dict.shipping.cost}`
        }
      ]
    },
    {
      id: 'returns',
      title: dict.returns.title,
      icon: RefreshCw,
      content: [
        {
          heading: '',
          text: dict.returns.consumerLaw
        },
        {
          heading: dict.returns.cancellationTitle,
          text: `${dict.returns.cancellationRight} ${dict.returns.howToCancel}`
        },
        {
          heading: dict.returns.refundTitle,
          text: `${dict.returns.refund} ${dict.returns.refundCondition}`
        }
      ]
    },
    {
      id: 'warranty',
      title: dict.legalPage.warranty.title,
      icon: BadgeCheck,
      content: [
        {
          heading: '',
          text: dict.legalPage.warranty.intro
        },
        {
          heading: 'Warranty Scope',
          text: dict.legalPage.warranty.scope
        },
        {
          heading: 'Coverage',
          text: dict.legalPage.warranty.coverage
        },
        {
          heading: 'Exclusions',
          text: dict.legalPage.warranty.exclusions
        },
        {
          heading: 'Defective Products',
          text: dict.legalPage.warranty.defectiveProduct
        },
        {
          heading: 'Remedies',
          text: dict.legalPage.warranty.remedies
        },
        {
          heading: dict.legalPage.warranty.contactTitle,
          text: dict.legalPage.warranty.contactPhone
        }
      ]
    },
    {
      id: 'cookies',
      title: dict.legalPage.cookies.title,
      icon: Cookie,
      content: [
        {
          heading: dict.legalPage.cookies.whatHeading,
          text: dict.legalPage.cookies.whatText
        },
        {
          heading: dict.legalPage.cookies.typesHeading,
          text: dict.legalPage.cookies.typesText
        },
        {
          heading: dict.legalPage.cookies.thirdPartyHeading,
          text: dict.legalPage.cookies.thirdPartyText
        },
        {
          heading: dict.legalPage.cookies.managingHeading,
          text: dict.legalPage.cookies.managingText
        },
        {
          heading: dict.legalPage.cookies.consentHeading,
          text: dict.legalPage.cookies.consentText
        }
      ]
    },
    {
      id: 'accessibility',
      title: dict.legalPage.accessibility.title,
      icon: Eye,
      content: [
        {
          heading: dict.legalPage.accessibility.commitmentHeading,
          text: dict.legalPage.accessibility.commitmentText
        },
        {
          heading: dict.legalPage.accessibility.featuresHeading,
          text: dict.legalPage.accessibility.featuresText
        },
        {
          heading: dict.legalPage.accessibility.complianceHeading,
          text: dict.legalPage.accessibility.complianceText
        },
        {
          heading: dict.legalPage.accessibility.improvementsHeading,
          text: dict.legalPage.accessibility.improvementsText
        },
        {
          heading: dict.legalPage.accessibility.contactHeading,
          text: dict.legalPage.accessibility.contactText
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="bg-navy-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {dict.legalPage.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            {dict.legalPage.subtitle}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        {/* Quick Navigation */}
        <div className="mb-16 p-8 bg-gradient-to-br from-navy-50 to-gold-50 rounded-2xl border-2 border-gold-200">
          <h3 className="text-2xl font-bold text-navy-900 mb-6">{dict.legalPage.quickNavigation}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 p-4 bg-white rounded-lg hover:bg-gold-50 transition-colors duration-300 border border-gray-200 hover:border-gold-400 group"
                >
                  <Icon className="h-5 w-5 text-gold-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-navy-900">{section.title}</span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="space-y-16">
          {sections.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-gold-500">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-lg">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
                    {section.title}
                  </h2>
                </div>

                {/* Section Content */}
                <div className="space-y-8">
                  {section.content.map((item, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                      <h3 className="text-xl font-bold text-navy-900 mb-3">
                        {item.heading}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Last Updated */}
        <div className="mt-12 text-center text-sm text-gray-600">
          <p>{dict.legalPage.lastUpdated}: January 14, 2026</p>
          <p className="mt-2">
            {dict.legalPage.contactText}{' '}
            <a href="mailto:info@lozamountgerizim.com" className="text-gold-600 hover:text-gold-700 font-semibold">
              info@lozamountgerizim.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
