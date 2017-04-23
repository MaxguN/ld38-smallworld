// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "GameFramework/Actor.h"
#include "Territory.generated.h"

class UProceduralMeshComponent;

UCLASS()
class SMALLRTS_API ATerritory : public AActor
{
	GENERATED_BODY()
	
public:	
	// Sets default values for this actor's properties
	ATerritory();

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

private:
	UPROPERTY(EditAnywhere, Category = Materials)
	UProceduralMeshComponent *mesh;

	UPROPERTY(EditAnywhere, Category = Materials)
	UMaterialInterface* material;

	UPROPERTY(EditAnywhere, Category = Materials)
	TArray<FVector> vertices;
	
	UPROPERTY(EditAnywhere, Category = Materials)
	TArray<int32> triangles;
};
