import React from 'react'

interface FooterProps {}

export const REPORT_LINK =
  'https://github.com/eclipse-score/bazel_registry/issues'
export const BCR_UI_REPO_LINK =
  'https://github.com/eclipse-score/bazel_registry_ui'

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="flex flex-col bg-bzl-green-dark text-white items-center justify-center gap-2 h-18 p-4 bottom-2">
      <div className="text-center">
        The Eclipse S-Core Bazel Registry is maintained by the Eclipse S-Core
        team.
      </div>
      <div className="text-center">
        To report an issue with one of the modules, see the{' '}
        <a href={REPORT_LINK} className="underline hover:text-gray-200">
          instructions here
        </a>
        .
      </div>
      <div className="text-center">
        The source of this website can be found in{' '}
        <a href={BCR_UI_REPO_LINK} className="underline hover:text-gray-200">
          this repository
        </a>
        .
      </div>
    </footer>
  )
}
