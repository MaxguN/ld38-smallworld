// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "GameFramework/Pawn.h"
#include "Faction.generated.h"

class AEntity;

UCLASS()
class SMALLRTS_API AFaction : public APawn
{
	GENERATED_BODY()

public:
	// Sets default values for this pawn's properties
	AFaction();

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

	void AddEntity();
	void RunAlgorithm();
	void DoActions();

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;

	void TransferEntity(AEntity* Entity);
	void RemoveEntity(AEntity * Entity);

	
private:
	TArray<AEntity*> Entities;
	TArray<AEntity*> FreeEntities;
	TArray<FString> Actions;
};
