import { useState, useEffect } from 'react'

type Bank = {
  id: string
  name: string
}

type Branch = {
  id: string
  name: string
}

// Simulated API calls
const fetchBanks = async (): Promise<Bank[]> => {
  // In a real application, this would be an API call
  return [
    { id: '1', name: 'Bank A' },
    { id: '2', name: 'Bank B' },
    { id: '3', name: 'Bank C' },
  ]
}

const fetchBranches = async (bankId: string): Promise<Branch[]> => {
  // In a real application, this would be an API call
  return [
    { id: `${bankId}-1`, name: `Branch 1 of Bank ${bankId}` },
    { id: `${bankId}-2`, name: `Branch 2 of Bank ${bankId}` },
    { id: `${bankId}-3`, name: `Branch 3 of Bank ${bankId}` },
  ]
}

export const useBankWithdrawForm = () => {
  const [banks, setBanks] = useState<Bank[]>([])
  const [branches, setBranches] = useState<Branch[] | null>(null)
  const [selectedBank, setSelectedBank] = useState<string>('')
  const [selectedBranch, setSelectedBranch] = useState<string>('')
  const [beneficiaryName, setBeneficiaryName] = useState<string>('')

  useEffect(() => {
    fetchBanks().then(setBanks)
  }, [])

  // useEffect(() => {
  //   if (selectedBank) {
  //     fetchBranches(selectedBank).then(setBranches)
  //   } else {
  //     setBranches([])
  //   }
  //   setSelectedBranch('')
  // }, [selectedBank])

  const fetchBranchesForBank = async (bankId: string) => {
    const fetchedBranches = await fetchBranches(bankId);
    setBranches(fetchedBranches.length > 0 ? fetchedBranches : null);
  }

  return {
    banks,
    branches,
    selectedBank,
    setSelectedBank,
    selectedBranch,
    setSelectedBranch,
    beneficiaryName,
    setBeneficiaryName,
    fetchBranchesForBank,
  }
}