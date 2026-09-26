import { ref, onMounted, type Ref } from 'vue'

interface ContributionDay {
  date: string
  contributionCount: number
  color: string
}

interface ContributionWeek {
  contributionDays: ContributionDay[]
}

interface GitHubContributionsData {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        weeks: ContributionWeek[]
        totalContributions: number
      }
    }
  }
}

interface UseGitHubContributionsReturn {
  contributions: Ref<number[][]>
  totalContributions: Ref<number>
  loading: Ref<boolean>
  error: Ref<string | null>
  fetchContributions: () => Promise<void>
}

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'

const CONTRIBUTION_COLORS = [
  'rgba(99,102,241,0.04)',
  'rgba(99,102,241,0.15)',
  'rgba(99,102,241,0.32)',
  'rgba(99,102,241,0.55)',
  'rgba(99,102,241,0.85)',
]

function getColorLevel(count: number): number {
  if (count === 0) return 0
  if (count <= 3) return 1
  if (count <= 6) return 2
  if (count <= 10) return 3
  return 4
}

function parseWeeksToGrid(weeks: ContributionWeek[]): number[][] {
  const grid: number[][] = []

  for (let w = 0; w < weeks.length; w++) {
    const week: number[] = []
    for (let d = 0; d < 7; d++) {
      const day = weeks[w].contributionDays[d]
      const level = day ? getColorLevel(day.contributionCount) : 0
      week.push(level)
    }
    grid.push(week)
  }

  return grid
}

export function useGitHubContributions(): UseGitHubContributionsReturn {
  const contributions = ref<number[][]>([])
  const totalContributions = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const token = import.meta.env.VITE_GITHUB_TOKEN
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'saiful-rizal'

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `

  async function fetchContributions() {
    if (!token || token === 'your_github_token_here') {
      error.value = 'GitHub token not configured. Please add VITE_GITHUB_TOKEN to .env.local'
      return
    }

    loading.value = true
    error.value = null

    try {
      const response = await fetch(GITHUB_GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query,
          variables: { username },
        }),
      })

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const data: { data?: GitHubContributionsData; errors?: Array<{ message: string }> } = await response.json()

      if (data.errors) {
        throw new Error(data.errors[0].message)
      }

      if (!data.data?.user?.contributionsCollection?.contributionCalendar) {
        throw new Error('User not found or no contributions data')
      }

      const calendar = data.data.user.contributionsCollection.contributionCalendar
      contributions.value = parseWeeksToGrid(calendar.weeks)
      totalContributions.value = calendar.totalContributions
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch contributions'
      console.error('GitHub contributions fetch error:', err)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchContributions()
  })

  return {
    contributions,
    totalContributions,
    loading,
    error,
    fetchContributions,
  }
}