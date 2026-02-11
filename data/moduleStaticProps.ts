import {
  extractModuleInfo,
  getModuleMetadata,
  getSubmissionCommitOfVersion,
  hasAttestationFile,
  moduleInfo,
  ModuleInfo,
  reverseDependencies,
  sortVersions,
  getSourceJson,
  SourceJson,
} from './utils'
import { getGithubRepositoryMetadata } from './githubMetadata'
import { fetchDocsList, StardocModuleInfo } from './stardoc'

export interface VersionInfo {
  version: string
  submission: {
    hash: string
    authorDateIso: string
  }
  moduleInfo: ModuleInfo
  isYanked: boolean
  yankReason: string | null
  hasAttestationFile: boolean
  sourceJson: SourceJson | null
  stardocs: StardocModuleInfo[]
}

// [module]/[version] needs to reuse the same logic
export const getStaticPropsModulePage = async (
  module: string,
  version: string | null
) => {
  const metadata = await getModuleMetadata(module)
  let { versions } = metadata
  versions = sortVersions(versions)
  if (versions.length === 0) {
    return { notFound: true }
  }
  let yankedVersions = metadata.yanked_versions || {}

  const versionInfos: VersionInfo[] = await Promise.all(
    versions.map(async (version) => {
      const sourceJson = await getSourceJson(module, version)
      const stardocs = sourceJson?.docs_url
        ? await fetchDocsList(sourceJson.docs_url)
        : []

      return {
        version,
        submission: await getSubmissionCommitOfVersion(module, version),
        moduleInfo: await moduleInfo(module, version),
        isYanked: Object.keys(yankedVersions).includes(version),
        yankReason: yankedVersions[version] || null,
        hasAttestationFile: await hasAttestationFile(module, version),
        sourceJson,
        stardocs,
      }
    })
  )

  const latestVersion = versions[0]
  const selectedVersion = version || latestVersion

  // Get GitHub metadata from static JSON files
  const githubMetadata = await getGithubRepositoryMetadata(module)
  if (!githubMetadata) {
    console.warn(`No GitHub metadata found for module ${module}`)
  }

  return {
    props: {
      metadata,
      versionInfos,
      selectedVersion,
      reverseDependencies: await reverseDependencies(module),
      githubMetadata,
      deprecated: !!metadata.deprecated,
    },
  }
}
