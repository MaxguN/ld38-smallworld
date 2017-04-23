// Fill out your copyright notice in the Description page of Project Settings.

#include "SmallRTS.h"
#include "Entity.h"
#include "Faction.h"


// Sets default values
AFaction::AFaction()
{
 	// Set this pawn to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

}

// Called when the game starts or when spawned
void AFaction::BeginPlay()
{
	Super::BeginPlay();
	
	AddEntity();
	AddEntity();
}

void AFaction::AddEntity()
{
	AEntity *Entity = new AEntity();
	Entity->SetFaction(this);

	Entities.Add(Entity);
	FreeEntities.Add(Entity);
}

void AFaction::RunAlgorithm()
{
	/*	Actions
			procreation
				low population
				birth rate policy
				needs 2 entities
			attack
				relations policy
				exploration policy
			discuss in faction
				workload policy
				needs 2 entities
				morale
			discuss with other faction (convince)
				morale
				borders policy
				workload policy
				relations policy
			kidnap
				relations policy
				borders policy
				trading policy ?
			defend
				borders policy
				relations
			trade
				trading policy
			emmigration
				morale
				borders policy
			expatriation
				workload policy (other factions)
				borders policy
				workload policy
			explore
				exploration policy
			tourism
				workload policy
				borders policy

		Relations between factions ?
		Faction morale --> emmigration

		Policies
			borders (open / close) --> defense, trade, immigration, expatriation
			trading (more / less) --> trade
			exploration (more / less) --> explore territory
			birth rate (more / less) --> procreation
			relations (peaceful / hostile) --> attack
			workload (more / less) --> tourism, expatriation (from other factions)
	---------------------------------------------------------------------------------
		Check procreation

		Iterate over policies highest to lowest absolute value
			--> add action
				--> regarding other policies / values
				--> regarding frequency of action

		If X actions added, stop

		X between 2-10 depending on population (queue = population) */
}

void AFaction::DoActions()
{
	if (FreeEntities.Num()) {
		// TODO assign action to entity if possible
	}
}

// Called every frame
void AFaction::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

	RunAlgorithm();
	DoActions();
}

// Called to bind functionality to input
void AFaction::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);

}

void AFaction::TransferEntity(AEntity* Entity)
{
	Entity->GetFaction()->RemoveEntity(Entity);

	// TODO Cancel action of Entity

	Entities.Add(Entity);
	FreeEntities.Add(Entity);
}

void AFaction::RemoveEntity(AEntity * Entity)
{
	Entities.Remove(Entity);
	FreeEntities.Remove(Entity);
}

