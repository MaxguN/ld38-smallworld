// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "GameFramework/Actor.h"
#include "Entity.generated.h"

class AFaction;

UCLASS()
class SMALLRTS_API AEntity : public AActor
{
	GENERATED_BODY()
	
public:	
	// Sets default values for this actor's properties
	AEntity();

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

	AFaction* GetFaction();
	void SetFaction(AFaction *aFaction);

private:
	AFaction *Faction;
};
