import * as React from "react"

import { cn } from "@/lib/utils"
import type { AgentCommand } from "./ai-panel"

interface AgentActionItemProps {
  agent: AgentCommand
  onExecute: (agent: AgentCommand) => void
  isSelected?: boolean
}

const AgentActionItem: React.FC<AgentActionItemProps> = ({ agent, onExecute, isSelected }) => {
  const Icon = agent.icon

  return (
    <div
      className={cn(
        "tt-ai-panel-agent",
        isSelected && "tt-ai-panel-agent--selected"
      )}
      onClick={() => onExecute(agent)}
    >
      <Icon className="tt-ai-panel-agent-icon" />
      <div className="tt-ai-panel-agent-content">
        <div className="tt-ai-panel-agent-name">{agent.name}</div>
        <div className="tt-ai-panel-agent-description">{agent.description}</div>
      </div>
      {agent.shortcut && (
        <div className="tt-ai-panel-agent-shortcut">{agent.shortcut}</div>
      )}
    </div>
  )
}

export interface AgentListProps {
  agents: AgentCommand[]
  onAgent: (agent: AgentCommand) => void
}

export const AgentList: React.FC<AgentListProps> = ({ agents, onAgent }) => {
  return (
    <div className="tt-ai-panel-agents">
      {agents.map((agent) => (
        <AgentActionItem key={agent.id} agent={agent} onExecute={onAgent} />
      ))}
    </div>
  )
}
